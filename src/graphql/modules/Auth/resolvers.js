module.exports = {
  Query: {
    loadSession(_, __, { dataSources, user }) {
      return dataSources.AuthServices.loadSession(user)
    }
  },
  Mutation: {
    async login(_, { data }, { dataSources }) {
      return await dataSources.AuthServices.login(data)
    }
  }
}
