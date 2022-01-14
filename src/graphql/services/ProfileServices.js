const db = require( '../../db')
const NoPermissionError = require( '../../errors/NoPermissionError')

class ProfileServices {
  async profiles() {
    return await db('profiles')
  }

  async profile(filter) {
    try {
      if (!filter) return null
      const { id, name } = filter
      if (id) {
        return await db('profiles').where({ id }).first()
      } else if (name) {
        return await db('profiles').where({ name }).first()
      } else {
        return null
      }
    } catch (e) {
      throw new NoPermissionError(e.detail)
    }
  }
  async newProfile(data) {
    try {
      const [id] = await db('profiles')
        .insert({ ...data })
        .returning('id')

      return db('profiles').where({ id }).first()
    } catch (e) {
      throw new NoPermissionError(e.detail)
    }
  }
  async deleteProfile(filter) {
    try {
      const profile = await this.profile(filter)

      if (profile) {
        const { id } = profile

        await db('profiles').where({ id }).delete()
      }
      return profile
    } catch (e) {
      throw new NoPermissionError(e.detail)
    }
  }
  async editProfile(filter, data) {
    try {
      const profile = await this.profile(filter)

      if (profile) {
        const { id } = profile

        await db('profiles').where({ id }).update(data)
      }

      return !profile ? null : { ...profile, ...data }
    } catch (e) {
      throw new NoPermissionError(e.detail)
    }
  }
}
module.exports = new ProfileServices()
