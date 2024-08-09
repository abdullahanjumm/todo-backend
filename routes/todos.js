const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos.map(todo => ({
            id: todo._id.toString(),
            TodoText: todo.title,
            isCompleted: todo.isCompleted
        })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new todo
router.post('/todos', async (req, res) => {
    const { title, isCompleted } = req.body;
    const todo = new Todo({
        title,
        isCompleted,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({
            id: newTodo._id.toString(),
            TodoText: newTodo.title,
            isCompleted: newTodo.isCompleted
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET a single todo by ID
router.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({
            id: todo._id.toString(),
            TodoText: todo.title,
            isCompleted: todo.isCompleted
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT update a todo by ID
router.put('/todos/:id', async (req, res) => {
    const { title, isCompleted } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {
            title,
            isCompleted,
        }, { new: true });

        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        res.json({
            id: todo._id.toString(),
            TodoText: todo.title,
            isCompleted: todo.isCompleted
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo by ID
router.delete('/todos/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Todo not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
