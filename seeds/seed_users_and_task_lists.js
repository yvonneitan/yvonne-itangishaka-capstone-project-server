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
  const [workTasksListId, personalTasksListId, shoppingListId, moviesListId, destinationsListId] = await Promise.all([
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

    knex('task_lists').insert({
      user_id: userId,
      name: 'Movies',
      created_at: new Date(),
    }).then(result => result[0]),

    knex('task_lists').insert({
      user_id: userId,
      name: 'Destinations',
      created_at: new Date(),
    }).then(result => result[0]),
  ]);

  // Insert multiple tasks for each list
  await knex('tasks').insert([
    // Work Tasks
    {
      user_id: userId,
      list_id: workTasksListId,
      task: 'Finish project report',
      is_completed: false,
      start_time: new Date('2024-10-17 09:00:00'),
      end_time: new Date('2024-10-17 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: workTasksListId,
      task: 'Capstone project report',
      is_completed: false,
      start_time: new Date('2024-11-17 09:00:00'),
      end_time: new Date('2024-11-17 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: workTasksListId,
      task: 'Team meeting',
      is_completed: false,
      start_time: new Date('2024-10-17 13:00:00'),
      end_time: new Date('2024-10-17 14:00:00'),
      status: 'active',
    },

    // Personal Tasks
    {
      user_id: userId,
      list_id: personalTasksListId,
      task: 'Prepare a low-carb lunch',
      is_completed: false,
      start_time: new Date('2024-10-17 12:00:00'),
      end_time: new Date('2024-10-17 12:30:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: personalTasksListId,
      task: 'Watch Inception',
      is_completed: false,
      start_time: new Date('2024-10-16 18:00:00'),
      end_time: new Date('2024-10-16 20:30:00'),
      status: 'active',
    },

    // Shopping List
    {
      user_id: userId,
      list_id: shoppingListId,
      task: 'Buy groceries',
      is_completed: false,
      start_time: new Date('2024-10-18 10:00:00'),
      end_time: new Date('2024-10-18 11:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: shoppingListId,
      task: 'Order new shoes',
      is_completed: false,
      start_time: new Date('2024-10-19 10:00:00'),
      end_time: new Date('2024-10-19 11:00:00'),
      status: 'active',
    },

    // Movies List
    {
      user_id: userId,
      list_id: moviesListId,
      task: 'Watch The Matrix',
      is_completed: false,
      start_time: new Date('2024-10-20 19:00:00'),
      end_time: new Date('2024-10-20 21:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: moviesListId,
      task: 'Watch Interstellar',
      is_completed: false,
      start_time: new Date('2024-10-21 19:00:00'),
      end_time: new Date('2024-10-21 21:30:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: moviesListId,
      task: 'Watch Inception',
      is_completed: false,
      start_time: new Date('2024-10-22 20:00:00'),
      end_time: new Date('2024-10-22 22:30:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: moviesListId,
      task: 'Watch the new Avatar movie',
      is_completed: false,
      start_time: new Date('2024-10-23 19:00:00'),
      end_time: new Date('2024-10-23 21:30:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: moviesListId,
      task: 'Watch the latest Marvel movie',
      is_completed: false,
      start_time: new Date('2024-10-24 19:00:00'),
      end_time: new Date('2024-10-24 21:30:00'),
      status: 'active',
    },

    // Destinations List
    {
      user_id: userId,
      list_id: destinationsListId,
      task: 'Visit Paris',
      is_completed: false,
      start_time: new Date('2025-05-01 10:00:00'),
      end_time: new Date('2025-05-07 18:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: destinationsListId,
      task: 'Trip to Tokyo',
      is_completed: false,
      start_time: new Date('2025-06-15 10:00:00'),
      end_time: new Date('2025-06-30 18:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: destinationsListId,
      task: 'Explore New York City',
      is_completed: false,
      start_time: new Date('2025-07-01 10:00:00'),
      end_time: new Date('2025-07-15 18:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: destinationsListId,
      task: 'Go to the Grand Canyon',
      is_completed: false,
      start_time: new Date('2025-08-01 10:00:00'),
      end_time: new Date('2025-08-05 18:00:00'),
      status: 'active',
    },
    {
      user_id: userId,
      list_id: destinationsListId,
      task: 'Visit Sydney',
      is_completed: false,
      start_time: new Date('2025-09-01 10:00:00'),
      end_time: new Date('2025-09-10 18:00:00'),
      status: 'active',
    },
  ]);
}
