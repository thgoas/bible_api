
exports.up = function (knex, Promise) {
    return knex.schema.createTable('delete_account', table => {
        table.increments('id').primary()
        table.integer('user_id').notNull()
        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('delete_account')
};
