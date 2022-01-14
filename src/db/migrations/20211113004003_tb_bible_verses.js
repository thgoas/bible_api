
exports.up = function (knex, Promise) {
    return knex.schema.createTable('bible_verses', table => {
        table.increments('id').primary()
        table.integer('version_id').notNull()
        table.integer('book_id').notNull()
        table.integer('chapter').notNull()
        table.integer('verse').notNull()
        table.text('text').notNull()

        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bible_verses')
};
