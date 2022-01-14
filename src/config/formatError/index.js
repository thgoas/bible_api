const EmailError = require('../../errors/EmailError')
const NoPermissionError = require('../../errors/NoPermissionError')
const QueryError = require('../../errors/QueryError')
const UserNotFoundError = require('../../errors/UserNotFoundError')


module.exports = (error) => {
    if(error.originalError instanceof NoPermissionError){
      return new Error(error.message)
    }
    if(error.originalError instanceof UserNotFoundError){
      return new Error(error.message)
    
    }
    if(error.originalError instanceof EmailError){
      return new Error(error.message)
    
    }
    if(error.originalError instanceof QueryError){
      return new Error(error.message)
    
    }
   
    return error;
  }
