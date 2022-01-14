exports.up = function (knex, Promise) {
    return knex.schema.createTable('bible_books', table => {
        table.increments('id').primary()
        table.integer('testament_id').notNull()
        table.integer('position').notNull()
        table.string('name').notNull()
        table.string('abbreviation').notNull()

        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bible_books')
};