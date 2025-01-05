const express = require('express');
const router = express.Router();

// In-memory Class data
let classes = [];

// Create Class
router.post('/', (req, res) => {
    const newClass = { ClassName: classes.length + 1, ...req.body };
    classes.push(newClass);
    res.status(201).json({ message: 'Class created', class: newClass });
});


// Read All Class
router.get('/', (req, res) => {
    res.status(200).json(classes);
});


// Read Class by ID
router.get('/:id', (req, res) => {
    const newClass = classes.find(t => t.id === parseInt(req.params.id));
    if (!newClass) return res.status(404).json({ message: 'Todo not found' });
    res.json(newClass);
});


// Update Class by ID
router.put('/:id', (req, res) => {
    const newClass = classes.find(t => t.id === parseInt(req.params.id));
    if (!newClass) return res.status(404).json({ message: 'Class not found' });

    Object.assign(newClass, req.body);
    res.json({ message: 'Class updated', newClass });
});

// Delete Class by ID
router.delete('/:id', (req, res) => {
    const index = classes.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Class not found' });

    Classes.splice(index, 1);
    res.json({ message: 'Class deleted' });
});

module.exports = router;
