const bookshelf = require('../database/db')
const sales = require('./sales.model')

const user = bookshelf.model('UserTable',{
    tableName:'categories',
    idAttribute:'id',
    // sales() {
    //     return this.hasMany(sales, "user_id")
    // }
})

module.exports = user