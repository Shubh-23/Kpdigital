/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('SalesTable',table=>{
      table.increments('Id');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('UserTable.Id');
      table.integer('Amount').notNullable();
      table.datetime('Date').notNullable();
      table.timestamps(true,true)
  })
};

/**
 * @param { import("knex").Knex } knex()
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('SalesTable')
};
