const format = require( 'date-fns/format')
const db = require( './../../db')
const bibleService = require( './BibleServices')



class VerseOfTheDay {
  async verseOfTheDay(filter) {
    const { book_id, chapter, verse, creation_date, version_id } = filter

    const dateNow = new Date()
    const data = await db('bible_verse_of_the_day')
      .where({ date_publication: dateNow })
      .orderBy('creation_date', 'desc')
      .first()

    data.version_id = version_id

    if (data.id) {
      const resp = await bibleService.verse(data, 1, 1)
      return resp ? resp : null
    }

    return null
  }

  async newVerseOfTheDay(data) {
    const [id] = await db('bible_verse_of_the_day').insert(data).returning('id')

    return db('bible_verse_of_the_day').where({ id }).first()
  }
}

module.exports = new VerseOfTheDay()
