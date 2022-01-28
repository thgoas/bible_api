const NoPermissionError = require( '../../errors/NoPermissionError')
const db = require( '../../db')

class BibleServices {
  async testaments() {
    return await db('bible_testament')
  }
  async testament(filter) {
    const { id, name, testament_id } = filter

    if (testament_id) {
      return await db('bible_testament').where({ id: testament_id }).first()
    } else if (id) {
      return await db('bible_testament').where({ id }).first()
    } else if (name) {
      return await db('bible_testament')
        .where('name', 'like', `%${name}%`)
        .first()
    } else {
      return null
    }
  }
  async versions() {
    return await db('bible_version')
  }
  async version(filter) {
    const { id, name, version_id } = filter

    if (version_id) {
      return await db('bible_version').where({ id: version_id }).first()
    } else if (id) {
      return await db('bible_version').where({ id }).first()
    } else if (name) {
      return await db('bible_version')
        .where('name', 'like', `%${name}%`)
        .first()
    } else {
      return null
    }
  }
  async books() {
    return await db('bible_books')
  }
  async book(filter) {
    const { id, testament_id, position, name, book_id } = filter

    if (book_id) {
      return await db('bible_books').where({ id: book_id }).first()
    } else if (id) {
      return await db('bible_books').where({ id })
    } else if (testament_id) {
      return await db('bible_books').where({ testament_id })
    } else if (position) {
      return await db('bible_books').where({ position })
    } else if (name) {
      return await db('bible_books').where('name', 'like', `%${name}%`)
    } else {
      return null
    }
  }
  async verses(limit, offset) {
    if (!limit) {
      limit = 10
    }
    if (!offset) {
      offset = 0
    }
    if (limit < 10 || limit > 20) {
      throw new NoPermissionError('Limite Mínimo 10 e Máximo 20')
    }

    return await db('bible_verses').limit(limit).offset(offset).orderBy('id')
  }

  async chapterCount(filter, limit, offset) {
    const {
      id,
      version_id,
      book_id,
      chapter,
      verse,
      text,
      first_verse,
      end_verse
    } = filter

    if (version_id && book_id) {
      return await db('bible_verses')
        .distinct('chapter')
        .where({ version_id })
        .andWhere({ book_id })
        .returning('chapter')
    }
    return null
  }
  async versesCount(filter, limit, offset) {
    const {
      id,
      version_id,
      book_id,
      chapter,
      verse,
      text,
      first_verse,
      end_verse
    } = filter

    if (version_id && book_id && chapter) {
      return await db('bible_verses')
        .distinct('verse')
        .where({ version_id })
        .andWhere({ book_id })
        .andWhere({chapter})
        .returning('verse')
    }
    return null
  }

  async verse(filter, limit, offset) {
    const {
      id,
      version_id,
      book_id,
      chapter,
      verse,
      text,
      first_verse,
      end_verse
    } = filter
    if (version_id && book_id && chapter && first_verse && end_verse) {
      return await db('bible_verses')
        .where({ version_id })
        .andWhere({ book_id })
        .andWhere({ chapter })
        .andWhere('verse', '>=', first_verse)
        .andWhere('verse', '<=', end_verse)
        .orderBy('id')
    } else if (version_id && book_id && chapter && verse) {
      return await db('bible_verses')
        .where({ version_id })
        .andWhere({ book_id })
        .andWhere({ chapter })
        .andWhere({ verse })
        .orderBy('id')
    } else if (version_id && book_id && chapter) {
      return await db('bible_verses')
        .where({ version_id })
        .andWhere({ book_id })
        .andWhere({ chapter })
        .orderBy('id')
    } else if (version_id && book_id) {
      return await db('bible_verses')
        .where({ version_id })
        .andWhere({ book_id })
        .orderBy('id')
    } else if (id) {
      return await db('bible_verses')
        .where({ id })

        .orderBy('id')
    } else if (version_id) {
      return await db('bible_verses')
        .where({ version_id })

        .orderBy('id')
    } else if (book_id) {
      return await db('bible_verses')
        .where({ book_id })

        .orderBy('id')
    } else if (chapter) {
      return await db('bible_verses')
        .where({ chapter })

        .orderBy('id')
    } else if (verse) {
      return await db('bible_verses')
        .where({ verse })

        .orderBy('id')
    } else if (text) {
      return await db('bible_verses')
        .where('text', 'like', `%${text}%`)

        .orderBy('id')
    } else {
      return null
    }
  }
}

module.exports = new BibleServices()
