exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password', 60)
        table.boolean('active')
            .notNull().defaultTo(false)
        table.boolean('delete_Account')
            .notNull().defaultTo(false)
        table.timestamp('creation_date')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
