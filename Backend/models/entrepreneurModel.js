const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    middle_name: {
        type: String,
        required: false, 
        default: '',
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
        enum: ['Idea', 'Growth', 'Expansion', 'Mature'], 
    },
    description: {
        type: String,
        required: true,
    },
    team_size: {
        type: Number,
        required: true,
    },
    report_link: {
        type: String,
        required: true,
    },
    investment_take: {
        type: Boolean,
        required: true,
    },
    aware_of_startups_financial_terms: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;
