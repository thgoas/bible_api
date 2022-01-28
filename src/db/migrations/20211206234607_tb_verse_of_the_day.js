
exports.up = function (knex, Promise) {
    return knex.schema.createTable('bible_verse_of_the_day', table => {
        table.increments('id').primary()
        table.integer('book_id').notNull()
        table.integer('chapter').notNull()
        table.integer('first_verse').notNull()
        table.integer('end_verse').notNull()
        table.integer('user_id').notNull()
        table.text('reflection')
        table.string('author', 50)
        table.boolean('publication').notNull()
        table.date('date_publication').notNull()
        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bible_verse_of_the_day')
};
