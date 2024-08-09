const express = require('express');
const connectDB = require('./config/db'); // Import the connectDB function

const app = express();
const port = 3000;
//
const cors = require('cors');
app.use(cors());
// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Import todo routes
const todoRoutes = require('./routes/todos');
app.use('/api', todoRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Todo List API');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
