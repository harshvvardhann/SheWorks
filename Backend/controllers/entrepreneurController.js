const { ObjectId } = require('mongodb');
const { getDb, collections } = require('../config/db');

// Get all entrepreneurs
const getAllEntrepreneurs = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.entrepreneur);
        const entrepreneurs = await collection.find({}).toArray();
        res.status(200).json(entrepreneurs);
    } catch (error) {
        console.error('Error fetching entrepreneurs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get entrepreneur by ID
const getEntrepreneurById = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.entrepreneur);
        const entrepreneur = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!entrepreneur) {
            return res.status(404).json({ message: 'Entrepreneur not found' });
        }

        res.status(200).json(entrepreneur);
    } catch (error) {
        console.error('Error fetching entrepreneur:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new entrepreneur
const createEntrepreneur = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.entrepreneur);
        const result = await collection.insertOne(req.body);
        res.status(201).json({
            message: 'Entrepreneur created successfully',
            id: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating entrepreneur:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update entrepreneur
const updateEntrepreneur = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.entrepreneur);
        const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Entrepreneur not found' });
        }

        res.status(200).json({ message: 'Entrepreneur updated successfully' });
    } catch (error) {
        console.error('Error updating entrepreneur:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete entrepreneur
const deleteEntrepreneur = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.entrepreneur);
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Entrepreneur not found' });
        }

        res.status(200).json({ message: 'Entrepreneur deleted successfully' });
    } catch (error) {
        console.error('Error deleting entrepreneur:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search entrepreneurs by field of business
const searchEntrepreneursByField = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.entrepreneur);
        const entrepreneurs = await collection
            .find({
                field_of_business: { $regex: req.params.field, $options: 'i' },
            })
            .toArray();

        res.status(200).json(entrepreneurs);
    } catch (error) {
        console.error('Error searching entrepreneurs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllEntrepreneurs,
    getEntrepreneurById,
    createEntrepreneur,
    updateEntrepreneur,
    deleteEntrepreneur,
    searchEntrepreneursByField
};