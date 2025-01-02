const express = require('express');
const router = express.Router();

// In-memory users data
let users = [];

// Create User
router.post('/', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json({ message: 'User created', user });
});

// Read All Users
router.get('/', (req, res) => {
    res.status(200).json(users);
});

// Read User by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// Update User by ID
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    res.json({ message: 'User updated', user });
});

// Delete User by ID
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(index, 1);
    res.json({ message: 'User deleted' });
});

module.exports = router;
