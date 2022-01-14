const QueryError = require( '../../errors/QueryError')
const db = require( './../../db')
const bibleService = require( './BibleServices')



class ReflectionServices {
  async reflection(filter) {
    const { text, author, user_id, publication, date_publication } = filter

    let dateNow
    if (!date_publication) {
      dateNow = new Date()
    } else {
      dateNow = date_publication
    }
    try {
      const data = await db('bible_reflection')
        .where({ publication })
        .andWhere({ date_publication: dateNow })
        .first()
      return data ? data : null
    } catch (e) {
      throw new QueryError(e)
    }
  }

  // async newVerseOfTheDay(data: VerseOfTheDayProps) {
  //   const [id] = await db('bible_verse_of_the_day').insert(data).returning('id')

  //   return db('bible_verse_of_the_day').where({ id }).first()
  // }
}

module.exports = new ReflectionServices()
