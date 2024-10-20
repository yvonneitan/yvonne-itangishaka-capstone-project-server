/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries in the `tasks` table
  await knex('tasks').del();
  await knex('task_lists').del();
  await knex('users').del();

  // Insert sample data into the `users` table
  const userId = await knex('users').insert([
    {
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'password123', // Hash passwords in a real application
      created_at: new Date(),
    },
  ]).returning('id'); // Capture the inserted user ID

  // Insert multiple task lists
  const listIds = await knex('task_lists').insert([
    {
      user_id: userId[0],
      name: 'Work Tasks',
      created_at: new Date(),
    },
    {
      user_id: userId[0],
      name: 'Personal Tasks',
      created_at: new Date(),
    },
    {
      user_id: userId[0],
      name: 'Shopping List',
      created_at: new Date(),
    },
  ]).returning('id'); // Capture the inserted list IDs

  // Insert multiple tasks for each list
  await knex('tasks').insert([
    {
      user_id: userId[0],
      list_id: listIds[0], // Work Tasks
      task: 'Finish project report',
      is_completed: false,
      start_time: new Date('2024-10-17 09:00:00'),
      end_time: new Date('2024-10-17 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId[0],
      list_id: listIds[0], // Work Tasks
      task: 'Team meeting',
      is_completed: true,
      start_time: new Date('2024-10-17 13:00:00'),
      end_time: new Date('2024-10-17 14:00:00'),
      status: 'completed',
    },
    {
      user_id: userId[0],
      list_id: listIds[1], // Personal Tasks
      task: 'Prepare a low-carb lunch',
      is_completed: false,
      start_time: new Date('2024-10-17 12:00:00'),
      end_time: new Date('2024-10-17 12:30:00'),
      status: 'active',
    },
    {
      user_id: userId[0],
      list_id: listIds[1], // Personal Tasks
      task: 'Watch Inception',
      is_completed: true,
      start_time: new Date('2024-10-16 18:00:00'),
      end_time: new Date('2024-10-16 20:30:00'),
      status: 'completed',
    },
    {
      user_id: userId[0],
      list_id: listIds[2], // Shopping List
      task: 'Buy groceries',
      is_completed: false,
      start_time: new Date('2024-10-18 10:00:00'),
      end_time: new Date('2024-10-18 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId[0],
      list_id: listIds[2], // Shopping List
      task: 'Order new shoes',
      is_completed: false,
      start_time: new Date('2024-10-19 10:00:00'),
      end_time: new Date('2024-10-19 11:00:00'),
      status: 'active',
    },
  ]);
}
