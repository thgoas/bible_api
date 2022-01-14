exports.up = function (knex, Promise) {
    return knex.schema.createTable('forgot_password', table => {
        table.increments('id').primary()
        table.string('token').notNull()
        table.timestamp('expires').notNull()
        table.integer('user_id').notNull()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('forgot_password')
};
