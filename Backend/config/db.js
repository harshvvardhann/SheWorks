const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB Atlas Connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sheworks';
const client = new MongoClient(uri);

// Database and Collection Names
const dbName = 'sheworks';
const collections = {
    entrepreneur: 'entrepreneur',
    investor: 'investor',
    mentor: 'mentor',
    users: 'users',
};

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}

// Handle server shutdown gracefully
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

module.exports = {
    client,
    dbName,
    collections,
    connectToDatabase,
    getDb: () => client.db(dbName),
};
