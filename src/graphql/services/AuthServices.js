const db = require( '../../db')
const bcrypt = require( 'bcrypt-nodejs')

const UserServices = require( './UserServices')
const UserNotFoundError = require( '../../errors/UserNotFoundError')
const { getUserLogged } = require( '../../helpers/generator')

class AuthServices {
  async login(data) {
    const user = await db('users').where({ email: data.email }).first()
    
    if (!user || user.delete_account) {
      throw new UserNotFoundError('Usuário ou senha inválido')
    }
    if (!user) {
      throw new UserNotFoundError('Usuário ou senha inválido')
    }
    const passwordEquals = bcrypt.compareSync(data.password, user.password)

    if (!passwordEquals) {
      throw new UserNotFoundError('Usuário ou senha inválido')
    }
    if (!user.active) {
      throw new UserNotFoundError(
        'Verifique seu E-mail, e siga as instruções para habilitar sua conta!'
      )
    }
    // const profiles = await  UserServices.profiles(user)

    // user.profiles = profiles

    return user ? getUserLogged(user) : null
  }

  async loadSession(user) {
    if (user) {
      const userResponse = await UserServices.user(user)
      if (userResponse.delete_account) {
        throw new UserNotFoundError('Usuário ou senha inválido')
      } else {
        return userResponse
      }
    } else {
      return null
    }
  }
}

module.exports = new AuthServices()
