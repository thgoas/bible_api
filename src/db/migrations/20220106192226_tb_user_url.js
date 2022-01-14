exports.up = function (knex, Promise) {
    return knex.schema.createTable('image_url', table => {
        table.increments('id').primary()
        table.string('url').notNull()
        table.string('file_name').notNull()
        table.integer('user_id').notNull()
        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('image_url')
};
