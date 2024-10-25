// export default router;
import express from 'express';
import { getTaskListsByUserId,createTaskList } from '../controllers/task_lists-controller.js'; 

const router = express.Router(); 

// Route to get task lists by user ID
router.get('/task-lists', getTaskListsByUserId);
router.post('/task-lists', createTaskList); // Create a new task list


export default router;