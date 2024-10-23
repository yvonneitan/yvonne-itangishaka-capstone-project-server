import express from "express";
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
} from "../controllers/users-controller.js";

const router = express.Router(); 

// Route to get all users
router.get('/', getAllUsers);

// Route to create a new user
router.post('/', createUser);

// Route to get a specific user by ID
router.get('/:id', getUserById);

// Route to update a user by ID
router.put('/:id', updateUserById);

// Route to delete a user by ID
router.delete('/:id', deleteUserById);

// Export the router
export default router;
