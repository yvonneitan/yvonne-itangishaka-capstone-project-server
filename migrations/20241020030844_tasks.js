export function up(knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();                 
      table.string('list_type').notNullable();           
      table.string('task').notNullable();                
      table.boolean('is_completed').defaultTo(false);    
      table.datetime('start_time').nullable();           
      table.datetime('end_time').nullable();             
      table.enum('status', ['active', 'completed']).defaultTo('active');  
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('tasks');               
  }
  