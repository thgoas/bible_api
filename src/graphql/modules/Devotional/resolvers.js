
module.exports ={
  Devotional: {
    async user(devotional, _, { dataSources }) {
      return await dataSources.DevotionalServices.user(devotional)
    },
    async book(devotional, _, { dataSources }) {
      return await dataSources.DevotionalServices.book(devotional)
    },
    async amount(devotional, _, { dataSources }) {
      return await dataSources.DevotionalServices.amount(devotional)
    },
    async amount_day(devotional, _, { dataSources }) {
      return await dataSources.DevotionalServices.amount_day(devotional)
    }
  },
  Query: {
    async devotional(
      _,
      { filter },
      { dataSources, validateUser }
    ) {
      validateUser()
      return await dataSources.DevotionalServices.devotional(filter)
    }
  },
  Mutation: {
    async newDevotional(
      _,
      { data },
      { dataSources, validateUser }
    ) {
      validateUser()
      return await dataSources.DevotionalServices.newDevotional(data)
    },
    async editeDevotional(
      _,
      { filter, data },
      { dataSources, validateUser }
    ) {
      validateUser()
      return await dataSources.DevotionalServices.editeDevotional(filter, data)
    },
    async deleteDevotional(
      _,
      { filter },
      { dataSources, validateUser }
    ) {
      validateUser()
      return await dataSources.DevotionalServices.deleteDevotional(filter)
    }
  }
}
