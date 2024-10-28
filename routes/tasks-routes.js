import express from "express";

// import express from "express";
import * as tasksController from "../controllers/tasks-controller.js";

const router = express.Router();

// Route to add a new task,get tasks
router
  .route("/")
  .post(tasksController.addTask)
  .get(tasksController.getListTasks);

// Route to get all incomplete tasks
router.get("/active",tasksController.getActiveTasks);
// Route to get all incomplete tasks
router.get("/completed", tasksController.getCompleteTasks);

// Route to get a task by ID
router
  .route("/:id")
  .get(tasksController.getTaskById)
  .put(tasksController.updateTaskById)
  .delete(tasksController.deleteTaskById);

// Export the router
export default router;
