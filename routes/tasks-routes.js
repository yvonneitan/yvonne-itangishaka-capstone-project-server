import express from "express";

// import express from "express";
import {
  getActiveTasks,
  getCompleteTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTaskById,
  getListTasks
} from "../controllers/tasks-controller.js";

const router = express.Router(); 

// Route to get all incomplete tasks
router.get('/active', getActiveTasks);
// Route to get all incomplete tasks
router.get('/completed', getCompleteTasks);

// Route to get a task by ID
router.get('/:id', getTaskById);

// Route to add a new task
router.post('/', addTask);

// Route to update a task by ID
router.put('/:id', updateTaskById);

// Route to delete a task by ID
router.delete('/:id', deleteTaskById);

//Route to get tasks related to a list
router.get('/', getListTasks);

// Export the router
export default router;
