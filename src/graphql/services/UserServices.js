const db = require( '../../db')
const bcrypt = require( 'bcrypt-nodejs')

const ProfileServices = require( './ProfileServices')
// const ShopServices = require( './ShopServices')
const NoPermissionError = require( '../../errors/NoPermissionError')
const UserNotFoundError = require( '../../errors/UserNotFoundError')
const EmailError = require( '../../errors/EmailError')
const ConfirmAccountServices = require( './ConfirmAccountServices')

const nodemailer = require( 'nodemailer')

const  deleteAccountTemplate  = require( '../../templates/deleteAccount')

class UserServices {
  async url(user) {
    const [url] = await db('image_url')
      .where({ user_id: user.id })
      .returning('*')

    return url ? url.url : null
  }
  profiles(user) {
    return db('profiles')
      .join('users_profiles', 'profiles.id', 'users_profiles.profile_id')
      .where({ user_id: user.id })
  }
  shops(user) {
    return db('shops')
      .join('user_shops', 'shops.id', 'user_shops.shop_id')
      .where({ user_id: user.id })
  }

  async users() {
    return await db('users').orderBy('name')
  }

  async user(filter) {
    if (!filter) return null
    const { id, email } = filter
    if (id) {
      return db('users').where({ id }).first()
    } else if (email) {
      return db('users').where({ email }).first()
    } else {
      return null
    }
  }

  async registerUser(data) {
    const user = await this.newUser({
      name: data.name,
      email: data.email,
      password: data.password
    })

    if (user.email) {
      await ConfirmAccountServices.confirmAccount(user)
    }
    return user
  }

  async newUser(data) {
    const er =
      /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/
    if (data.name === '' || data.email === '' || data.password === '')
      throw new UserNotFoundError('Campos obrigatórios!')
    // if (!er.exec(data.email)) throw new UserNotFoundError('Email inválido')
    if (data.password.length < 6)
      throw new UserNotFoundError('Senha Mínima 6 caracteres')

    try {
      const idProfiles = []

      if (!data.profiles || !data.profiles.length) {
        data.profiles = [
          {
            name: 'common'
          }
        ]
      }

      for (let filter of data.profiles) {
        const profile = await ProfileServices.profile(filter)
        if (profile) idProfiles.push(profile.id)
      }

      const salt = bcrypt.genSaltSync()
      data.password = bcrypt.hashSync(data.password, salt)

      delete data.profiles

      const user = await db('users').where({ email: data.email }).first()

      if (user) {
        throw new EmailError('Email já cadastrado!')
      }

      const [id] = await db('users').insert(data).returning('id')

      if (idProfiles) {
        for (let profile_id of idProfiles) {
          await db('users_profiles').insert({ profile_id, user_id: id })
        }
      }

      return db('users').where({ id }).first()
    } catch (e) {
      throw new NoPermissionError(e)
    }
  }

  async editUser(filter, data, admin) {
    try {
      const user = await this.user(filter)
      if (user) {
        const { id } = user
        if (admin && data.profiles) {
          await db('users_profiles').where({ user_id: id }).delete()

          for (let filter of data.profiles) {
            const profile = await ProfileServices.profile(filter)

            if (profile) {
              await db('users_profiles').insert({
                profile_id: profile.id,
                user_id: id
              })
            }
          }
        }

        if (data.password) {
          const salt = bcrypt.genSaltSync()
          data.password = bcrypt.hashSync(data.password, salt)
        }

        delete data.profiles
        if (data.name || data.email) {
          await db('users').where({ id }).update(data)
        }
      }
      return !user ? null : { ...user, ...data }
    } catch (e) {
      throw new NoPermissionError(e)
    }
  }
  async deleteUser(filter) {
    try {
      const user = await this.user(filter)

      if (user) {
        const { id } = user
        await db('users_profiles').where({ user_id: id }).delete()

        await db('devotional').where({ user_id: id }).delete()

        await db('forgot_password').where({ user_id: id }).delete()

        await db('confirm_account').where({ user_id: id }).delete()

        const lastUrl = await db('image_url')
          .where({ user_id: id })
          .delete()
          .returning('*')
        if (lastUrl.length > 0) {
          require('fs').unlink(
            `./uploads/${lastUrl[0].file_name}`,
            function (err) {
              console.log('Unlink Error', err)
            }
          )
        }

        await db('users').where({ id }).delete()
      }
      return user
    } catch (e) {
      throw new NoPermissionError(e)
    }
  }
  async deleteAccount(filter) {
    try {
      const user = await this.user(filter)
      if (user) {
        const { id } = user
        await db('users').where({ id }).update({ delete_account: true })
        await db('delete_account').insert({ user_id: id })

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
          subject: 'Exclusão de Conta', // Subject line
          html: deleteAccountTemplate(user.name) // html body
        })

        const message = {
          message:
            'Seu pedido de exclusão de conta foi recebido com sucesso, dentro de 60 dias sua conta será excluída permanentemente.'
        }
        if (info.accepted.length > 0) return message
      }
      return null
    } catch (e) {
      throw new NoPermissionError(e)
    }
  }
}

module.exports = new UserServices()
