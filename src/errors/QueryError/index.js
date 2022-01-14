

class QueryError extends Error{
  constructor(message, ...args){
      super(message, ...args)
      
      this.message = message
      this.name = 'QueryError'
      
  }
}

module.exports = QueryError
