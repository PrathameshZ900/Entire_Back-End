const express = require('express');
const router = express.Router();

// In-memory students data
let students = [];

// Create students
router.post('/', (req, res) => {
    const newStudent= { id: students.length + 1, ...req.body };
    students.push(newStudent);
    res.status(201).json({ message: 'Student created', newStudent });
});

// Read All students
router.get('/', (req, res) => {
    res.status(200).json(students);
});

// Read studentsby ID
router.get('/:id', (req, res) => {
    const newStudent = students.find(u => u.id === parseInt(req.params.id));
    if (!newStudent) return res.status(404).json({ message: 'Student not found' });
    res.json(newStudent);
});

// Update students by ID
router.put('/:id', (req, res) => {
    const newStudent = students.find(u => u.id === parseInt(req.params.id));
    if (!newStudent) return res.status(404).json({ message: 'Student not found' });

    Object.assign(newStudent, req.body);
    res.json({ message: 'User updated', newStudent });
});

// Delete students by ID
router.delete('/:id', (req, res) => {
    const index = students.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Student not found' });

    students.splice(index, 1);
    res.json({ message: 'Student deleted' });
});

module.exports = router; // Export the router
