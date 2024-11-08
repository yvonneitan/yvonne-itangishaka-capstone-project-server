// import express from "express";
// import * as userController from "../controllers/users-controller.js";

// const router = express.Router();

// // Route to get all users
// router
//   .route("/")
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// // Route to get a specific user by ID
// router
//   .route("/:id")
//   .get(userController.getUserById)
//   .put(userController.updateUserById)
//   .delete(userController.deleteUserById);

// // Export the router
// export default router;
// import express from 'express';
// import * as usersController from '../controllers/users-controller.js';

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Route definitions
// app.get('/api/users', usersController.getAllUsers);
// app.post('/api/users', usersController.createUser);
// app.get('/api/users/:id', usersController.getUserById);
// app.put('/api/users/:id', usersController.updateUserById);
// app.delete('/api/users/:id', usersController.deleteUserById);

// // Export the express app as a serverless function
// export default (req, res) => {
//   app(req, res); // Handling requests
// };
import express from 'express';
import * as usersController from '../controllers/users-controller.js';

const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Route definitions
router.get('/users', usersController.getAllUsers);
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUserById);
router.delete('/users/:id', usersController.deleteUserById);

// Export a Vercel-friendly serverless function
export default (req, res) => {
  const app = express();
  app.use(router);
  app(req, res); // Handle the request
};
