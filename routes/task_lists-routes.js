// import express from 'express';
// import { getTaskListsByUserId } from '../controllers/task_lists-controller.js'; 

// const router = express.Router(); 

// // Route to get task lists by user ID
// router.get('/task-lists', getTaskListsByUserId);

// export default router;
import express from 'express';
import { getTaskListsByUserId } from '../controllers/task_lists-controller.js'; 

const router = express.Router(); 

// Route to get task lists by user ID
router.get('/task-lists', getTaskListsByUserId);

export default router;
