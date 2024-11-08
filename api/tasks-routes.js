// import express from "express";

// // import express from "express";
// import * as tasksController from "../controllers/tasks-controller.js";

// const router = express.Router();

// // Route to add a new task,get tasks
// router
//   .route("/")
//   .post(tasksController.addTask)
//   .get(tasksController.getListTasks);

// // Route to get all incomplete tasks
// router.get("/active",tasksController.getActiveTasks);
// // Route to get all incomplete tasks
// router.get("/completed", tasksController.getCompleteTasks);

// // Route to get a task by ID
// router
//   .route("/:id")
//   .get(tasksController.getTaskById)
//   .put(tasksController.updateTaskById)
//   .delete(tasksController.deleteTaskById);

// // Export the router
// export default router;

// import express from 'express';
// import * as tasksController from '../controllers/tasks-controller.js';

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Route definitions
// app.post('/api/tasks', tasksController.addTask);
// app.get('/api/tasks', tasksController.getListTasks);
// app.get('/api/tasks/active', tasksController.getActiveTasks);
// app.get('/api/tasks/completed', tasksController.getCompleteTasks);
// app.get('/api/tasks/:id', tasksController.getTaskById);
// app.put('/api/tasks/:id', tasksController.updateTaskById);
// app.delete('/api/tasks/:id', tasksController.deleteTaskById);

// // Export the express app as a serverless function
// export default (req, res) => {
//   app(req, res); // Handling requests
// };
import express from 'express';
import * as tasksController from '../controllers/tasks-controller.js';

const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Route definitions
router.post('/tasks', tasksController.addTask);
router.get('/tasks', tasksController.getListTasks);
router.get('/tasks/active', tasksController.getActiveTasks);
router.get('/tasks/completed', tasksController.getCompleteTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.put('/tasks/:id', tasksController.updateTaskById);
router.delete('/tasks/:id', tasksController.deleteTaskById);

// Export a Vercel-friendly serverless function
export default (req, res) => {
  const app = express();
  app.use(router);
  app(req, res);
};
