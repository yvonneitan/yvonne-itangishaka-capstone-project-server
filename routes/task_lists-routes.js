import express from "express";
import * as taskListsController from "../controllers/task_lists-controller.js";
import { validateList } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Route to get task lists by user ID
router
  .route("/task-lists")
  .get(taskListsController.getTaskListsByUserId)
  .post(validateList, taskListsController.createTaskList);

router
  .route("/task-lists/:id")
  .delete(taskListsController.deleteTaskList)
  .put(validateList, taskListsController.updateTaskList);

export default router;