const { ObjectId } = require('mongodb');
const { getDb, collections } = require('../config/db');

// Get all investors
const getAllInvestors = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.investor);
        const investors = await collection.find({}).toArray();
        res.status(200).json(investors);
    } catch (error) {
        console.error('Error fetching investors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get investor by ID
const getInvestorById = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.investor);
        const investor = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }

        res.status(200).json(investor);
    } catch (error) {
        console.error('Error fetching investor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new investor
const createInvestor = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.investor);
        const result = await collection.insertOne(req.body);
        res.status(201).json({
            message: 'Investor created successfully',
            id: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating investor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update investor
const updateInvestor = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.investor);
        const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Investor not found' });
        }

        res.status(200).json({ message: 'Investor updated successfully' });
    } catch (error) {
        console.error('Error updating investor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete investor
const deleteInvestor = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.investor);
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Investor not found' });
        }

        res.status(200).json({ message: 'Investor deleted successfully' });
    } catch (error) {
        console.error('Error deleting investor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search investors by interested categories
const searchInvestorsByCategory = async (req, res) => {
    try {
        const database = getDb();
        const collection = database.collection(collections.investor);
        const investors = await collection
            .find({
                interested_category_startups: { $in: [new RegExp(req.params.category, 'i')] },
            })
            .toArray();

        res.status(200).json(investors);
    } catch (error) {
        console.error('Error searching investors:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllInvestors,
    getInvestorById,
    createInvestor,
    updateInvestor,
    deleteInvestor,
    searchInvestorsByCategory
};