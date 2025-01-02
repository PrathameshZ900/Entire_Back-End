const express = require('express');
const bodyParser = require('body-parser');
const validateRequest = require('./middleware/validateRequest');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// POST route
app.post('/', validateRequest, (req, res) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    // Simulate saving data to a database
    const todo = { ID, Name, Rating, Description, Genre, Cast };
    res.status(201).json({ message: 'TODO created successfully', todo });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
