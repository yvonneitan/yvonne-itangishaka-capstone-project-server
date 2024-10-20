import db from '../db.js'; 

 

// Controller to get task lists by user ID
export const getTaskListsByUserId = async (req, res) => {
  const userId = req.query.userId; 
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const taskLists = await db('task_lists').where({ user_id: userId });
    if (taskLists.length === 0) {
      return res.status(404).json({ message: 'No task lists found for this user' });
    }
    res.json(taskLists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching task lists' });
  }
};
