
exports.up = function (knex, Promise) {
    return knex.schema.createTable('bible_testament', table => {
        table.increments('id').primary()
        table.string('name').notNull()

        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bible_testament')
};
