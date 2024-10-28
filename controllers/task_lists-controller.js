import db from "../db.js";

export const getTaskListsByUserId = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const taskLists = await db("task_lists")
      .select("task_lists.id", "task_lists.name")
      .count("tasks.id as count")
      .leftJoin("tasks", "task_lists.id", "tasks.list_id")
      .where({ "task_lists.user_id": userId })
      .groupBy("task_lists.id");
    res.json(taskLists);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching task lists" });
  }
};

export const createTaskList = async (req, res) => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ error: "Name and User ID are required" });
  }

  try {
    const [newTaskList] = await db("task_lists").insert(
      { name, user_id: userId },
      ["id", "name"]
    );

    res.status(201).json(newTaskList);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the task list" });
  }
};
export const deleteTaskList = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Task List ID is required" });
  }

  try {
    const deletedCount = await db("task_lists").where({ id }).del();

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Task List not found" });
    }

    res.status(200).json({ message: "Task List deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task list" });
  }
};

export const updateTaskList = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return res
      .status(400)
      .json({ error: "Task List ID and name are required" });
  }

  try {
    const updatedCount = await db("task_lists").where({ id }).update({ name });

    if (updatedCount === 0) {
      return res.status(404).json({ error: "Task List not found" });
    }

    res.status(200).json({ message: "Task List updated successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the task list" });
  }
};
