const NoPermissionError = require( '../../errors/NoPermissionError')
const QueryError = require( '../../errors/QueryError')
const db = require( '../../db')
const { format } = require( 'date-fns')

class DevotionalServices {
  async amount_day(devotional) {
    const { user_id } = devotional

    const now = new Date()

    const amount = await db('devotional')
      .count({ user_id })
      .whereRaw('DATE(creation_date) = ?', `${format(now, 'yyyy-MM-dd')}`)
      .andWhere({ user_id })

      .first()

    return amount ? amount.user_id : null
  }
  async amount(devotional) {
    const { user_id } = devotional

    const amount = await db('devotional')
      .count({ user_id })
      .where({ user_id })
      .first()

    return amount ? amount.user_id : null
  }
  async user(devotional) {
    return db('users').where({ id: devotional.user_id }).first()
  }
 
  async devotional(filter) {
    const { id, user_id, creation_date } = filter
    if (id && user_id) {
      return await db('devotional').where({ id }).andWhere({ user_id })
    } else if (user_id) {
      return await db('devotional')
        .where({ user_id })
        .orderBy('creation_date', 'desc')
    }
    return null
  }
  async newDevotional(data) {
    const dateNow = new Date()
   const books = data.books
    
    try {
      const isReleased = await db('devotional')
        .where({ user_id: data.user_id })
        .andWhereRaw('??::date = ?', ['creation_date', dateNow])
      console.log(dateNow)
      console.log(isReleased)

      if (isReleased.length < 3) {
        delete data.books
        const dataResponse = await db('devotional').insert(data).returning('*')
      
        
        
        return dataResponse[0]
      } else {
        throw new NoPermissionError(
          'Desculpe, você só pode fazer três devocionais por dia!'
        )
      }
    } catch (e) {
      throw new QueryError(e)
    }
  }
  async editeDevotional(filter, data) {
    const { id, user_id } = filter
    try {
      const idResponse = await db('devotional')
        .where({ id })
        .andWhere({ user_id })
        .returning('*')
      if (idResponse.length !== 0) {
        const dataResponse = await db('devotional')
          .update(data)
          .where({ id })
          .andWhere({ user_id })
          .returning('*')
        return dataResponse[0]
      } else {
        throw new NoPermissionError('Sem permissão para alterar o registro!.')
      }
    } catch (e) {
      throw new QueryError(e)
    }
  }
  async deleteDevotional(filter) {
    const { id, user_id } = filter
    try {
      const idResponse = await db('devotional')
        .where({ id })
        .andWhere({ user_id })
        .returning('*')
      if (idResponse.length !== 0) {
        const dataResponse = await db('devotional')
          .delete()
          .where({ id })
          .andWhere({ user_id })
          .returning('*')
        return dataResponse[0]
      } else {
        throw new NoPermissionError('Sem permissão para deletar o registro!.')
      }
    } catch (e) {
      throw new QueryError(e)
    }
  }
}

module.exports = new DevotionalServices()
