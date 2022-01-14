const jwt = require( 'jwt-simple')

const NoPermissionError = require( '../../errors/NoPermissionError')
// const pubsub = new PubSub(
const UserServices = require( '../../graphql/services/UserServices')

module.exports = async ({ req, connection }) => {
  let auth = null
  if (connection) {
    auth = connection.context.Authorization
  } else {
    auth = req.headers.authorization
  }

  const token = auth && auth.substring(7)

  let user= null
  let admin = false
  let delete_account

  if (token) {
    let env = process.env.APP_AUTH_SECRET
    try {
      let contentToken = jwt.decode(token, env)
      if (new Date(contentToken.exp * 1000) > new Date()) {
        user = contentToken
      }
    } catch (e) {
      //token invalido
    }
  }
  // if(user && user.profiles){
  //     admin = user.profiles.includes('admin')
  // }

  if (user) {
    const profilesResponse = await UserServices.profiles(user)
    const profiles = profilesResponse.map((item) => item.name)
    admin = profiles.includes('admin')
    const userAccount = await UserServices.user(user)
    delete_account = userAccount.delete_account
  }

  const err = new NoPermissionError('Acesso negado!')

  return {
    user,
    admin,

    validateUser() {
      if (!user) throw err
    },
    validateAdmin() {
      if (!admin) throw err
    },

    validateUserFilter(filter) {
      if (admin) return

      if (!user) throw err
      if (!filter) throw err

      const { id, email } = filter
      if (!id && !email) throw err
      if (id && id !== user.id) throw err
      if (email && email !== user.email) throw err
    }
  }
}
