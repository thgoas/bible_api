module.exports = {
  Query: {
    async profiles(parent, args, { dataSources }) {
      return await dataSources.ProfileServices.profiles()
    },
    async profile(parent, { filter }, { dataSources }) {
      return await dataSources.ProfileServices.profile(filter)
    }
  },
  Mutation: {
    async newProfile(
      _,
      { data },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()

      return await dataSources.ProfileServices.newProfile(data)
    },
    async deleteProfile(
      _,
      { filter },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()
      return await dataSources.ProfileServices.deleteProfile(filter)
    },
    async editProfile(
      _,
      { filter, data },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()
      return await dataSources.ProfileServices.editProfile(filter, data)
    }
  }
}
