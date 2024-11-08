// // export default router;
// import express from "express";
// import * as taskListsContoller from "../controllers/task_lists-controller.js";

// const router = express.Router();

// // Route to get task lists by user ID
// router
//   .route("/task-lists")
//   .get(taskListsContoller.getTaskListsByUserId)
//   .post(taskListsContoller.createTaskList);
// router
//   .route("/task-lists/:id")
//   .delete(taskListsContoller.deleteTaskList)
//   .put(taskListsContoller.updateTaskList);

// export default router;
// import express from 'express';
// import * as taskListsController from '../controllers/task_lists-controller.js';

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Route definitions
// app.get('/api/task-lists', taskListsController.getTaskListsByUserId);
// app.post('/api/task-lists', taskListsController.createTaskList);
// app.delete('/api/task-lists/:id', taskListsController.deleteTaskList);
// app.put('/api/task-lists/:id', taskListsController.updateTaskList);

// // Export the app to handle HTTP requests for this route
// export default (req, res) => app(req, res);
import express from 'express';
import * as taskListsController from '../controllers/task_lists-controller.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Route definitions
app.get('/api/task-lists', taskListsController.getTaskListsByUserId);
app.post('/api/task-lists', taskListsController.createTaskList);
app.delete('/api/task-lists/:id', taskListsController.deleteTaskList);
app.put('/api/task-lists/:id', taskListsController.updateTaskList);

// Export the app to handle HTTP requests for this route
export default (req, res) => app(req, res);
