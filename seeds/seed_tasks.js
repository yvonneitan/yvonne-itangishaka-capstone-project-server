/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries in the `tasks` table
  await knex('tasks').del();

  // Inserts seed entries into the `tasks` table
  await knex('tasks').insert([
    {
      list_type: 'work',
      task: 'Finish project report',
      is_completed: false,
      start_time: new Date('2024-10-17 09:00:00'),
      end_time: new Date('2024-10-17 11:00:00'),
      status: 'active',  
    },
    {
      list_type: 'diet',
      task: 'Prepare a low-carb lunch',
      is_completed: false,
      start_time: new Date('2024-10-17 12:00:00'),
      end_time: new Date('2024-10-17 12:30:00'),
      status: 'active',
    },
    {
      list_type: 'movies',
      task: 'Watch Inception',
      is_completed: true,
      start_time: new Date('2024-10-16 18:00:00'),
      end_time: new Date('2024-10-16 20:30:00'),
      status: 'completed',
    },
    {
      list_type: 'work',
      task: 'Team meeting',
      is_completed: true,
      start_time: new Date('2024-10-17 13:00:00'),
      end_time: new Date('2024-10-17 14:00:00'),
      status: 'completed',
    },
  ]);
}
