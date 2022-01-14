
exports.up = function (knex, Promise) {
    return knex.schema.createTable('bible_reflection', table => {
        table.increments('id').primary()
        table.text('text').notNull()
        table.string('author').notNull()
        table.integer('user_id').notNull()
        table.boolean('publication').notNull()
        table.date('date_publication').notNull()
        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bible_reflection')
};

