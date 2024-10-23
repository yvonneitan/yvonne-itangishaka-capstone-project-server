import db from "../db.js";

// Controller to get all incomplete tasks
export const getActiveTasks = async (req, res) => {
  try {
    const tasks = await db('tasks').where('is_completed', false);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Controller to get all incomplete tasks
export const getCompleteTasks = async (req, res) => {
    try {
      const tasks = await db('tasks').where('is_completed', true);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Controller to get a task by ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db('tasks').where({ id }).first();
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to add a new task
export const addTask = async (req, res) => {
  const { list_type, task, start_time, end_time } = req.body;
  try {
    await db('tasks').insert({ list_type, task, start_time, end_time, is_completed: false });
    res.status(201).json({ message: 'Task added!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to update a task by ID
export const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const { task, is_completed } = req.body;
  try {
    const updatedRows = await db('tasks').where({ id }).update({ task, is_completed });
    if (updatedRows) {
      res.json({ message: 'Task updated!' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to delete a task by ID
export const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await db('tasks').where({ id }).del();
    if (deletedRows) {
      res.json({ message: 'Task deleted!' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getListTasks = async (req, res) => {
  const listName = req.query.listName;

  console.log("List Name:", listName);

  if (!listName) {
      return res.status(400).json({ error: 'List Name is required' });
  }

  try {
      // Query the database to get tasks only from the specified list name
      const tasks = await db('tasks')
          .select('tasks.id', 'tasks.task', 'tasks.status', 'tasks.start_time', 'tasks.end_time')
          .join('task_lists', 'tasks.list_id', 'task_lists.id') 
          .where({ 'task_lists.name': listName });              
      res.json(tasks);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
};
