

module.exports = {
  Mutation: {
    async forgotPassword(
      _,
      { filter },
      { dataSources }
    ) {
      return await dataSources.ForgotPasswordServices.forgotPassword(filter)
    }
  }
}
