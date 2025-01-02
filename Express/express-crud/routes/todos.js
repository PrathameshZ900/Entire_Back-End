const express = require('express');
const router = express.Router();

// In-memory todos data
let todos = [];

// Create Todo
router.post('/', (req, res) => {
    const todo = { id: todos.length + 1, ...req.body };
    todos.push(todo);
    res.status(201).json({ message: 'Todo created', todo });
});

// Read All Todos
router.get('/', (req, res) => {
    res.status(200).json(todos);
});

// Read Todo by ID
router.get('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

// Update Todo by ID
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    Object.assign(todo, req.body);
    res.json({ message: 'Todo updated', todo });
});

// Delete Todo by ID
router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Todo not found' });

    todos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
