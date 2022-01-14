
module.exports = {
  Mutation: {
    async confirmAccount(
      _,
      { filter },
      { dataSources }
    ) {
      return await dataSources.ConfirmAccountServices.confirmAccount(filter)
    },
    async activateAccount(
      _,
      { data },
      { dataSources }
    ) {
      return await dataSources.ConfirmAccountServices.activateAccount(data)
    }
  }
}
