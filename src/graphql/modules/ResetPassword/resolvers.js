
module.exports = {
  Mutation: {
    async resetPassword(_, { data }, { dataSources }) {
      return await dataSources.ResetPasswordServices.resetPassword(data)
    }
  }
}
