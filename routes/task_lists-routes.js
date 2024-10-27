// export default router;
import express from 'express';
import { getTaskListsByUserId,createTaskList,deleteTaskList, updateTaskList } from '../controllers/task_lists-controller.js'; 

const router = express.Router(); 

// Route to get task lists by user ID
router.get('/task-lists', getTaskListsByUserId);
router.post('/task-lists', createTaskList); 
router.delete('/task-lists/:id', deleteTaskList); 
router.put('/task-lists/:id', updateTaskList); 

export default router;
