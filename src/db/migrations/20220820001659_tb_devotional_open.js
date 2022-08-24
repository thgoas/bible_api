
exports.up = function (knex) {
    return knex.schema.createTable('devotional_open', table => {
        table.increments('id').primary()
        table.text('Description').notNull()
        table.boolean('publish').notNull()
        table.integer('user_id').notNull()

        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('devotional_open')
};
