const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
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
        enum: ['Early Growth', 'Mid Growth', 'Late Growth'],
    },
    description: {
        type: String,
        required: true,
    },
    willing_to_provide_free_mentorship: {
        type: Boolean,
        required: true,
    },
    interested_category_startups: {
        type: [String], 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
