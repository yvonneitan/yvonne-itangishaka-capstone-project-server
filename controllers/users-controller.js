import db from "../db.js";

// Controller to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await db('users').select('*'); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to create a new user
export const createUser = async (req, res) => {
    const { username, email, password } = req.body; 
    try {
        const [id] = await db('users').insert({ username, email, password }); 
        res.status(201).json({ message: 'User created!', id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get a specific user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db('users').where({ id }).first(); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to update a user by ID
export const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedRows = await db('users').where({ id }).update({ username, email, password }); 
        if (updatedRows) {
            res.json({ message: 'User updated!' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a user by ID
export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await db('users').where({ id }).del();
        if (deletedRows) {
            res.json({ message: 'User deleted!' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
