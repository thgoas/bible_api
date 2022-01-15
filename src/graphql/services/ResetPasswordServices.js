const UserNotFoundError = require( '../../errors/UserNotFoundError')
const db = require( '../../db')
const QueryError = require( '../../errors/QueryError')
const bcrypt = require( 'bcrypt-nodejs')

require('dotenv').config()
const NoPermissionError = require( '../../errors/NoPermissionError')

class ResetPasswordServices {
  async resetPassword(data) {
    const { password, token } = data

    try {
      const isToken = await db('forgot_password')
        .where({ token })
        .orderBy('expires', 'desc')
        .first()

      if (isToken === undefined) {
        throw new NoPermissionError('Token Inválido!')
      }

      if (!isToken.token) {
        throw new NoPermissionError('Token Inválido!')
      }
      if (isToken.token !== token) {
        await db('forgot_password').where({ id: isToken.id }).delete()

        throw new NoPermissionError('Token Inválido!')
      }
      const now = new Date()
      if (now > isToken.expires) {
        await db('forgot_password').where({ id: isToken.id }).delete()

        throw new NoPermissionError('Token Expirado gere outro token!')
      }

      const user = await db('users').where({ id: isToken.user_id }).first()
      if (!user) {
        throw new UserNotFoundError('Email não cadastrado!')
      }

      const salt = bcrypt.genSaltSync()
      const newPassword = bcrypt.hashSync(password, salt)
      const respUser = await db('users')
        .where({ id: user.id })
        .update({ password: newPassword })
        .returning('*')

      await db('forgot_password').where({ id: isToken.id }).delete()
      return respUser ? respUser[0] : null
    } catch (err) {
      throw new QueryError(err)
    }
  }
}

module.exports = new ResetPasswordServices()
