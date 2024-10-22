/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries in the `tasks`, `task_lists`, and `users` tables
  await knex('tasks').del();
  await knex('task_lists').del();
  await knex('users').del();

  // Insert sample data into the `users` table
  const [userId] = await knex('users').insert([
    {
      username: 'Yvonne',
      email: 'yvonneitan@example.com',
      password: 'password123', 
      created_at: new Date(),
    },
  ]);

  // Insert multiple task lists using the userId
  const [workTasksListId, personalTasksListId, shoppingListId] = await Promise.all([
    knex('task_lists').insert({
      user_id: userId,
      name: 'Work Tasks',
      created_at: new Date(),
    }).then(result => result[0]),

    knex('task_lists').insert({
      user_id: userId,
      name: 'Personal Tasks',
      created_at: new Date(),
    }).then(result => result[0]),

    knex('task_lists').insert({
      user_id: userId,
      name: 'Shopping List',
      created_at: new Date(),
    }).then(result => result[0]),
  ]);

  // Insert multiple tasks for each list
  await knex('tasks').insert([
    {
      user_id: userId,
      list_id: workTasksListId, // Work Tasks
      task: 'Finish project report',
      is_completed: false,
      start_time: new Date('2024-10-17 09:00:00'),
      end_time: new Date('2024-10-17 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: workTasksListId, // Work Tasks
      task: 'Capstone project report',
      is_completed: false,
      start_time: new Date('2024-11-17 09:00:00'),
      end_time: new Date('2024-11-17 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: workTasksListId, // Work Tasks
      task: 'Team meeting',
      is_completed: false,
      start_time: new Date('2024-10-17 13:00:00'),
      end_time: new Date('2024-10-17 14:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: personalTasksListId, // Personal Tasks
      task: 'Prepare a low-carb lunch',
      is_completed: false,
      start_time: new Date('2024-10-17 12:00:00'),
      end_time: new Date('2024-10-17 12:30:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: personalTasksListId, // Personal Tasks
      task: 'Watch Inception',
      is_completed: false,
      start_time: new Date('2024-10-16 18:00:00'),
      end_time: new Date('2024-10-16 20:30:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: shoppingListId, // Shopping List
      task: 'Buy groceries',
      is_completed: false,
      start_time: new Date('2024-10-18 10:00:00'),
      end_time: new Date('2024-10-18 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: shoppingListId, // Shopping List
      task: 'Order new shoes',
      is_completed: false,
      start_time: new Date('2024-10-19 10:00:00'),
      end_time: new Date('2024-10-19 11:00:00'),
      status: 'active',
    },
  ]);
}
