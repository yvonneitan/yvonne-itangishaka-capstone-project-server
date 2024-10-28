import express from "express";
import * as userController from "../controllers/users-controller.js";

const router = express.Router();

// Route to get all users
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Route to get a specific user by ID
router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

// Export the router
export default router;
