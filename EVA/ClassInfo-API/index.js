const express = require('express');
const bodyParser = require('body-parser');
const classesRoutes = require('./routes/classes');
const studentsRoutes = require('./routes/students');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/classes', classesRoutes);
app.use('/students', studentsRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Express CRUD App!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

