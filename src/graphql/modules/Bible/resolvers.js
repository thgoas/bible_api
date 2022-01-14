module.exports = {
  Books: {
    async testament(book, _, { dataSources }) {
      return await dataSources.BibleServices.testament(book)
    }
  },
  Verse: {
    async version(verse, _, { dataSources }) {
      return await dataSources.BibleServices.version(verse)
    },
    async book(verse, _, { dataSources }) {
      return await dataSources.BibleServices.book(verse)
    }
  },
  Query: {
    async testaments(_, __, { dataSources }) {
      return await dataSources.BibleServices.testaments()
    },
    async testament(_, { filter }, { dataSources }) {
      return await dataSources.BibleServices.testament(filter)
    },
    async versions(_, __, { dataSources }) {
      return await dataSources.BibleServices.versions()
    },
    async version(_, { filter }, { dataSources }) {
      return await dataSources.BibleServices.version(filter)
    },
    async books(_, __, { dataSources }) {
      return await dataSources.BibleServices.books()
    },
    async book(_, { filter }, { dataSources }) {
      return await dataSources.BibleServices.book(filter)
    },
    async verses(_, { limit, offset }, { dataSources }) {
      return await dataSources.BibleServices.verses(limit, offset)
    },
    async verse(_, { filter, limit, offset }, { dataSources }) {
      return await dataSources.BibleServices.verse(filter, limit, offset)
    },
    async chapterCount(
      _,
      { filter, limit, offset },
      { dataSources }
    ) {
      return await dataSources.BibleServices.chapterCount(filter, limit, offset)
    }
  }
}
