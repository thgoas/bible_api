
module.exports = {
  VerseOfTheDay: {
    book (verseOfTheDay, _, {dataSources}){
      return dataSources.BibleServices.book(verseOfTheDay)
    }
  },
  Query: {
    async verseOfTheDay(
      _,
      { filter },
      { dataSources }
    ) {
      return await dataSources.VerseOfTheDayServices.verseOfTheDay(filter)
    },
    async versesOfTheDays(_, __,{dataSources} ){
      return await dataSources.VerseOfTheDayServices.versesOfTheDays()
    },
    async verseOfTheDayEdit(_, {filter}, {dataSources, validateAdmin}){
      validateAdmin()
      return await dataSources.VerseOfTheDayServices.verseOfTheDayEdit(filter)
    }
  },
  Mutation: {
    async newVerseOfTheDay(
      _,
      { data },
      { dataSources, validateAdmin }
    ) {
      validateAdmin()
      return await dataSources.VerseOfTheDayServices.newVerseOfTheDay(data)
    },
    async editVerseOfTheDay (_, {filter, data}, {dataSources, validateAdmin}){
      validateAdmin()
      return await dataSources.VerseOfTheDayServices.editVerseOfTheDay(filter, data)
    },
    async deleteVerseOfTheDay(_, {filter}, {dataSources, validateAdmin}){
      validateAdmin()
      return await dataSources.VerseOfTheDayServices.deleteVerseOfTheDay(filter)

    }
  }
}
