const format = require( 'date-fns/format')
const db = require( './../../db')
const bibleService = require( './BibleServices')



class VerseOfTheDay {

  async versesOfTheDays() {
    const data = await db('bible_verse_of_the_day')

      .orderBy('creation_date', 'desc')
      
      return data ? data: null
  }

  async verseOfTheDay(filter) {
    const { book_id, chapter, verse, creation_date, version_id, date_publication } = filter
    const now = new Date()
    let date
    if(date_publication === undefined || date_publication === ''){
     date = now
    } else {
      date = date_publication
    }
    const data = await db('bible_verse_of_the_day')
      .where({ date_publication: date })
      .orderBy('creation_date', 'desc')
      .first()

    data.version_id = version_id

    if (data.id) {
      const resp = await bibleService.verse(data, 1, 1)
      
      data.verse = resp
      return data ? data : null
    }

    return null
  }

  async verseOfTheDayEdit(filter){
    const {id} = filter

    const data = await db('bible_verse_of_the_day').where({id}).first()

    return data? data : null
  }


  async newVerseOfTheDay(data) {


    const [id] = await db('bible_verse_of_the_day').insert(data).returning('id')

    return db('bible_verse_of_the_day').where({ id }).first()
  }

  async editVerseOfTheDay(filter, data){
    const {id} = filter

    const response = await this.verseOfTheDayEdit(filter)

    if(response){
      const [response] = await db('bible_verse_of_the_day').update(data).where({id}).returning('*')
      return response
    }

    return null

  }

  async deleteVerseOfTheDay(filter) {
    const {id} = filter

    const response = await this.verseOfTheDayEdit(filter)

    if(response){
      const[response] = await db('bible_verse_of_the_day').delete().where({id}).returning('*')
      return response
    }

    return null
    
  }
}

module.exports = new VerseOfTheDay()
