// export default router;
import express from "express";
import * as taskListsContoller from "../controllers/task_lists-controller.js";

const router = express.Router();

// Route to get task lists by user ID
router
  .route("/task-lists")
  .get(taskListsContoller.getTaskListsByUserId)
  .post(taskListsContoller.createTaskList);
router
  .route("/task-lists/:id")
  .delete(taskListsContoller.deleteTaskList)
  .put(taskListsContoller.updateTaskList);

export default router;
