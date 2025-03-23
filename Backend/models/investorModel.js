const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    business_name: {
        type: String,
        required: true,
    },
    field_of_business: {
        type: String,
        required: true,
    },
    current_stage: {
        type: String,
        required: true,
        enum: ['Seed', 'Series A', 'Series B'], 
    },
    description: {
        type: String,
        required: true,
    },
    interested_category_startups: {
        type: [String], 
        required: true,
    },
    amount_wanted_to_invest: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Investor = mongoose.model('Investor', investorSchema);

module.exports = Investor;
