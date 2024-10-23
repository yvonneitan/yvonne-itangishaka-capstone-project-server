import db from '../db.js'; 

export const getTaskListsByUserId = async (req, res) => {
    const userId = req.query.userId; 
    console.log("User ID:", userId);

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const taskLists = await db('task_lists')
            .select('task_lists.id', 'task_lists.name')
            .count('tasks.id as count')
            .leftJoin('tasks', 'task_lists.id', 'tasks.list_id')
            .where({ 'task_lists.user_id': userId })  
            .groupBy('task_lists.id');

        console.log("Task Lists Query Result:", taskLists); // Log the result
        res.json(taskLists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching task lists' });
    }
};

  