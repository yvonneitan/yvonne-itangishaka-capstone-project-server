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

export const createTaskList = async (req, res) => {
    const { name, userId } = req.body; // Get name and userId from the request body
    console.log("Creating Task List:", { name, userId });

    if (!name || !userId) {
        return res.status(400).json({ error: 'Name and User ID are required' });
    }

    try {
        const [newTaskList] = await db('task_lists').insert(
            { name, user_id: userId }, // Insert the new task list
            ['id', 'name'] // Return the id and name of the newly created task list
        );

        console.log("New Task List Created:", newTaskList);
        res.status(201).json(newTaskList); // Respond with the created task list
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the task list' });
    }
};
