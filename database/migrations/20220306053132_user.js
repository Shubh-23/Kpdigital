/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('UserTable',table=>{
        table.increments('Id');
        table.string('Name');
        table.string('Email');
        table.integer('Age')
        table.enu('Gender', ['male', 'Female'])
        table.timestamps(true,true)
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('UserTable')
  
};
