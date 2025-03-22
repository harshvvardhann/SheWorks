const { ObjectId } = require('mongodb');
const { getDb, collections } = require('../config/db');

// Get all mentors
const getAllMentors = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.mentor);
        const mentors = await collection.find({}).toArray();
        res.status(200).json(mentors);
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get mentor by ID
const getMentorById = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.mentor);
        const mentor = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        res.status(200).json(mentor);
    } catch (error) {
        console.error('Error fetching mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new mentor
const createMentor = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.mentor);
        const result = await collection.insertOne(req.body);
        res.status(201).json({
            message: 'Mentor created successfully',
            id: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update mentor
const updateMentor = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.mentor);
        const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        res.status(200).json({ message: 'Mentor updated successfully' });
    } catch (error) {
        console.error('Error updating mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete mentor
const deleteMentor = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.mentor);
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        res.status(200).json({ message: 'Mentor deleted successfully' });
    } catch (error) {
        console.error('Error deleting mentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search mentors willing to provide free mentorship
const getFreeMentors = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.mentor);
        const mentors = await collection.find({ willing_to_provide_free_mentorship: true }).toArray();

        res.status(200).json(mentors);
    } catch (error) {
        console.error('Error searching mentors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllMentors,
    getMentorById,
    createMentor,
    updateMentor,
    deleteMentor,
    getFreeMentors
};