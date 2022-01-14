


class EmailError extends Error{
  constructor(message, ...args){
      super(message, ...args)
      
      this.message = message
      this.name = 'EmailError'
      
  }
}

module.exports = EmailError