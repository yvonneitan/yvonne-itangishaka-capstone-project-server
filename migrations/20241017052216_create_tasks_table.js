export function up(knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();                 
      table.string('list_type').notNullable();           
      table.string('task').notNullable();                
      table.boolean('is_completed').defaultTo(false);    
      table.datetime('start_time').nullable();           
      table.datetime('end_time').nullable();             
      table.enum('status', ['active', 'completed']).defaultTo('active');  
      table.timestamps(true, true);                      
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('tasks');               
  }
  