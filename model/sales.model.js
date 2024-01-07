const bookshelf = require('../database/db')

const user = bookshelf.model('SalesTable',{
    tableName:'admins',
    idAttribute:'Id'
})

module.exports = user