const { GraphQLUpload } = require( 'graphql-tools')


module.exports = {
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (
      _,
      { filter, file },
      { dataSources, validateUserFilter }
    ) => {
      validateUserFilter(filter)
      return await dataSources.UploadServices.singleUpload(filter, file)
    }
  }
}
