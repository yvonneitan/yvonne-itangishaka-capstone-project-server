import express from "express";
import * as tasksController from "../controllers/tasks-controller.js";
import { validateTask } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Route to add a new task, get tasks
router
  .route("/")
  .post(validateTask, tasksController.addTask)
  .get(tasksController.getListTasks);

// Route to get all incomplete tasks
router.get("/active", tasksController.getActiveTasks);

// Route to get all complete tasks
router.get("/completed", tasksController.getCompleteTasks);

// Route to get a task by ID
router
  .route("/:id")
  .get(tasksController.getTaskById)
  .put(validateTask, tasksController.updateTaskById)
  .delete(tasksController.deleteTaskById);

export default router;