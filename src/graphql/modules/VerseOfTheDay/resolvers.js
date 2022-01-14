module.exports = {
  Query: {
    async verseOfTheDay(
      _,
      { filter },
      { dataSources }
    ) {
      return await dataSources.VerseOfTheDayServices.verseOfTheDay(filter)
    }
  },
  Mutation: {
    async newVerseOfTheDay(
      _,
      { data },
      { dataSources }
    ) {
      return await dataSources.VerseOfTheDayServices.newVerseOfTheDay(data)
    }
  }
}
