const UserNotFoundError = require( '../../errors/UserNotFoundError')
const db = require( '../../db')
const crypto = require( 'crypto')
const QueryError = require( '../../errors/QueryError')
const nodemailer = require( 'nodemailer')

require('dotenv').config()
const  resetTemplate  = require( '../../templates/reset')
// dotenv.config()

class ForgotPasswordServices {
  async forgotPassword(filter) {
    const { email } = filter

    try {
      const user = await db('users').where({ email }).first()
      if (!user) {
        throw new UserNotFoundError('Email não cadastrado!')
      }
      const token = crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)

      const resetToken = await db('forgot_password')
        .insert({ token: token, expires: now, user_id: user.id })
        .returning('*')

      if (resetToken) {
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
          subject: 'Recuperar Senha', // Subject line
          html: resetTemplate(token, user.name) // html body
        })

        const forgotPassword = {
          message:
            'Verifique seu email e siga as instruções para recuperação de senha.'
        }
        if (info.accepted.length > 0) return forgotPassword
      }

      return null
    } catch (err) {
      throw new QueryError(err)
    }
    
  }
}
module.exports = new ForgotPasswordServices()
