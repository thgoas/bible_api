
exports.up = function (knex) {
    return knex.schema.createTable('devotional', table => {
        table.increments('id').primary()
        table.text('verse_key').notNull()
        table.text('personality_of_god').notNull()
        table.text('promise').notNull()
        table.text('conditions_promise').notNull()
        table.text('personal_applications').notNull()
        table.text('sins_to_avoid').notNull()
        table.text('personal_notes').notNull()
        table.boolean('publish').notNull()
        table.integer('user_id').notNull()

        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('devotional')
};
