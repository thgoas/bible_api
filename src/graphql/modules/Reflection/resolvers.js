
module.exports = {
  Query: {
    async reflection(
      _,
      { filter },
      { dataSources }
    ) {
      return await dataSources.ReflectionServices.reflection(filter)
    }
  }
}
