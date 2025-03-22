const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const entrepreneurRoutes = require('./routes/entrepreneurRoutes');
const investorRoutes = require('./routes/investorRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const authRoutes = require('./routes/authRoutes');

// Import database connection
const { connectToDatabase } = require('./config/db');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/api/entrepreneurs', entrepreneurRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/users', authRoutes);

// Initialize server
async function start() {
    await connectToDatabase();

    app.listen(port, () => {
        console.log(`Sheworks API running on port ${port}`);
    });
}

// Start the server
start().catch(console.error);

module.exports = app;
