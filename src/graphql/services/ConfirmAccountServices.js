const UserNotFoundError = require( '../../errors/UserNotFoundError')
const db = require( '../../db')
const crypto = require( 'crypto')
const QueryError = require( '../../errors/QueryError')
const nodemailer = require( 'nodemailer')

require ('dotenv').config()

const confirmAccountTemplate  = require( '../../templates/confirmAccountTemplate')
const NoPermissionError = require( '../../errors/NoPermissionError')
// dotenv.config()

class ConfirmAccountServices {
  async confirmAccount(filter) {
    const { email } = filter

    try {
      const user = await db('users').where({ email }).first()

      if (!user) {
        throw new UserNotFoundError('Email não cadastrado!')
      }
      const token = crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 720)

      const confirmToken = await db('confirm_account')
        .insert({ token: token, expires: now, user_id: user.id })
        .returning('*')

      if (confirmToken) {
        const transporter = nodemailer.createTransport({
          host: process.env.NODEMAILER_HOST,
          port: Number(process.env.NODEMAILER_PORT),
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
          }
        })
        let info = await transporter.sendMail({
          from: '"Hora do Devocional" <horadodevocionalbr@gmail.com>', // sender address
          to: user.email, //`${user.email}`, // list of receivers
          subject: 'Ativar Conta', // Subject line
          html: confirmAccountTemplate(token, user.name) // html body
        })

        const confirmAccount = {
          message:
            'Verifique seu email e siga as instruções para confirmação da conta.'
        }

        if (info.accepted.length > 0) return confirmAccount
      }

      return null
    } catch (err) {
      throw new QueryError(err)
    }
  }

  async activateAccount(data) {
    const { active, token } = data

    try {
      const isToken = await db('confirm_account')
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
        await db('confirm_account').where({ id: isToken.id }).delete()

        throw new NoPermissionError('Token Inválido!')
      }
      const now = new Date()
      if (now > isToken.expires) {
        await db('confirm_account').where({ id: isToken.id }).delete()

        throw new NoPermissionError('Token Expirado gere outro token!')
      }

      const user = await db('users').where({ id: isToken.user_id }).first()
      if (!user) {
        throw new UserNotFoundError('Email não cadastrado!')
      }

      const respUser = await db('users')
        .where({ id: user.id })
        .update({ active })
        .returning('*')

      await db('confirm_account').where({ id: isToken.id }).delete()
      return respUser ? respUser[0] : null
    } catch (err) {
      throw new QueryError(err)
    }
  }
}

module.exports = new ConfirmAccountServices()
