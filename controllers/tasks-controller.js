import db from "../db.js";

// Controller to get all incomplete tasks
export const getActiveTasks = async (req, res) => {
  try {
    const tasks = await db("tasks").where("is_completed", false);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Controller to get all incomplete tasks
export const getCompleteTasks = async (req, res) => {
  try {
    const tasks = await db("tasks").where("is_completed", true);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get a task by ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db("tasks").where({ id }).first();
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Controller to add a new task
export const addTask = async (req, res) => {
  const { list_id, task, start_time, end_time, user_id } = req.body;
  try {
    await db("tasks").insert({
      task,
      start_time,
      end_time,
      list_id,
      user_id,
      is_completed: false,
    });
    res.status(201).json({ message: "Task added!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Controller to delete a task by ID
export const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await db("tasks").where({ id }).del();
    if (deletedRows) {
      res.json({ message: "Task deleted!" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getListTasks = async (req, res) => {
  const listName = req.query.listName;
  if (!listName) {
    return res.status(400).json({ error: "List Name is required" });
  }

  try {
    // Query the database to get tasks only from the specified list name
    const tasks = await db("tasks")
      .select(
        "tasks.id",
        "tasks.task",
        "tasks.status",
        "tasks.start_time",
        "tasks.end_time"
      )
      .join("task_lists", "tasks.list_id", "task_lists.id")
      .where({ "task_lists.name": listName });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};
export const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const { task, is_completed, start_time, end_time } = req.body;

  // Initialize an update object
  const updateData = { task, is_completed };

  // Format dates if they exist
  if (start_time) {
    updateData.start_time = new Date(start_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
  if (end_time) {
    updateData.end_time = new Date(end_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }

  try {
    const updatedRows = await db("tasks").where({ id }).update(updateData);

    if (updatedRows) {
      res.json({ message: "Task updated!" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.error("Error updating task:", err);
    res
      .status(500)
      .json({ error: "Failed to update task", details: err.message });
  }
};
