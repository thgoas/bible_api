const jwt = require( 'jwt-simple')

module.exports = {
  async getUserLogged(user) {
    //const profiles =  user.profiles
    const now = Math.floor(Date.now() / 1000)
    const userInfo = {
      id: user.id,
      email: user.email,
      iat: now,
      exp: now + 3 * 24 * 60 * 60
      //exp: agora + (180)
    }
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      password_change: user.password_change,
      profiles: user.profiles
    }
    let env = process.env.APP_AUTH_SECRET
    return {
      ...userResponse,
      token: jwt.encode(userInfo, env)
    }
  }
}


