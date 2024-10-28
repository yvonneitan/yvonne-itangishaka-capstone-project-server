export async function up(knex) {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('task_lists', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('tasks', (table) => {
      table.increments('id').primary();
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('list_id')
        .unsigned()
        .references('id')
        .inTable('task_lists')
        .onDelete('CASCADE')
        .nullable();
      table.string('task').notNullable();
      table.boolean('is_completed').defaultTo(false);
      table.datetime('start_time').nullable();
      table.datetime('end_time').nullable();
      table.enum('status', ['active', 'completed']).defaultTo('active');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex) {
  await knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('task_lists')
    .dropTableIfExists('users');
}
