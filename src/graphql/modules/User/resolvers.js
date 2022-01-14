
module.exports = {
  User: {
    profiles(user, _, { dataSources }) {
      return dataSources.UserServices.profiles(user)
    },
    url(user, _, { dataSources }) {
      return dataSources.UserServices.url(user)
    }
  },
  Query: {
    async users(parent, args, { dataSources, validateAdmin }) {
      validateAdmin()
      return dataSources.UserServices.users()
    },

    async user(
      parent,
      { filter },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()
      return dataSources.UserServices.user(filter)
    }
  },

  Mutation: {
    async registerUser(_, { data }, { dataSources }) {
      return await dataSources.UserServices.registerUser(data)
    },
    async newUser(
      _,
      { data },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()
      return await dataSources.UserServices.newUser(data)
    },
    async editUser(
      _,
      { filter, data },
      { dataSources, validateUserFilter, admin }
    ) {
      validateUserFilter(filter)
      return await dataSources.UserServices.editUser(filter, data, admin)
    },
    async deleteUser(
      _,
      { filter },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()
      return await dataSources.UserServices.deleteUser(filter)
    },
    async deleteAccount(
      _,
      { filter },
      { dataSources, validateUserFilter }
    ) {
      validateUserFilter(filter)
      return await dataSources.UserServices.deleteAccount(filter)
    }
  }
}
