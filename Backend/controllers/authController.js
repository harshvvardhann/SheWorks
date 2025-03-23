const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { getDb, collections } = require('../config/db');
const { Role } = require('../enums/enums');
require('dotenv').config();
// Register a new user
const registerUser = async (req, res) => {
    try {
        const { email, password, role, name } = req.body;

        // Validate required fields
        if (!email || !password || !role || !name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate role - restrict which roles can be self-assigned
        const allowedSelfRegistrationRoles = [Role.Entrepreneur, Role.Investor, Role.Mentor];
        if (!allowedSelfRegistrationRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const db = getDb();

        // Check if user already exists
        const existingUser = await db.collection(collections.users).findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user object with role
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date(),
        };

        // Insert user to database
        const user = await db.collection(collections.users).insertOne(newUser);
        req.user = user;

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.insertedId, role: user.role }, // Payload - user details
            process.env.JWT_SECRET_KEY, // Your JWT secret key from env file
            { expiresIn: '24h' } // Token expiry time (1 hour in this case)
        );
        console.log(token);
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000,
        });

        // Set token in cookie
        res.setHeader('Authorization', `Bearer ${token}`);

        // Or set token in header (alternative to setting in cookie)
        // res.setHeader('Authorization', `Bearer ${token}`);

        res.status(201).json({
            message: 'User registered successfully',
            user: user,
            role: role,
            token: token, // You can also return the token in the response
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};
// Login route
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const db = getDb();

        // Check if user exists
        const user = await db.collection(collections.users).findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare entered password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET_KEY, // Store your JWT secret in environment variables
            { expiresIn: '1h' } // Token expiry time
        );

        // Set token in cookies or return it in the response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        const db = getDb();
        const user = await db.collection(collections.users).findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } } // Exclude password
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const handleSubmission = async (req, res) => {
    try {
        // Get user info from auth middleware
        const { userId, role, email } = req.user;
        const submissionData = req.body;

        if (!submissionData) {
            return res.status(400).json({ message: 'No submission data provided' });
        }

        const db = getDb();
        let result;

        // Add common fields to all submissions
        const submission = {
            ...submissionData,
            userId: _id,
            email,
            submittedAt: new Date(),
            updatedAt: new Date(),
        };

        // Route to appropriate collection based on role
        switch (role) {
            case Role.Entrepreneur:
                // Validate entrepreneur-specific fields
                if (!submission.businessName || !submission.organisation || !submission.mobileNumber || !submission.firstName) {
                    return res.status(400).json({
                        message: 'Required fields missing: businessName, industry, and description are required',
                    });
                }

                // Handle entrepreneur submission
                result = await db.collection(collections.entrepreneur).updateOne(
                    { userId: _id },
                    {
                        $set: {
                            business: {
                                name: submission.businessName,
                                industry: submission.organisation,
                                mobileNumber: submissionData.mobileNumber,
                                fieldName: submission?.fieldName,
                                businessName: submission?.businessName,
                                currentBusinessStage: submission.currentBusinessStage,
                                description: submission?.description,
                                teamSize: submission?.teamSize,
                                investmentNeeded: submission?.investmentNeeded,
                                financialReports: submission?.financialReports,
                                financialTermAwarness: submission?.financialTermAwarness,
                                updatedAt: new Date(),
                            },
                        },
                    },
                    { upsert: true }
                );
                break;

            case Role.Investor:
                // Validate investor-specific fields
                if (!submission.firstName || !submission.businessField) {
                    return res.status(400).json({
                        message: 'Required fields missing: investmentRange and interestedCategories are required',
                    });
                }

                // Handle investor submission
                result = await db.collection(collections.investor).updateOne(
                    { userId: _id },
                    {
                        $set: {
                            firstName: submission.firstName,
                            lastName: submission?.lastName,
                            businessField: submission.businessField,
                            organisation: submission?.organisation,
                            investmentRange: submission?.investmentRange,
                            updatedAt: new Date(),
                        },
                    },
                    { upsert: true }
                );
                break;

            case Role.Mentor:
                // Validate mentor-specific fields
                if (!submission.expertise || !submission.experienceYears) {
                    return res.status(400).json({
                        message: 'Required fields missing: expertise and experienceYears are required',
                    });
                }

                // Handle mentor submission
                result = await db.collection(collections.mentor).updateOne(
                    { userId: new ObjectId(userId) },
                    {
                        $set: {
                            expertise: submission.expertise,
                            experienceYears: submission.experienceYears,
                            freeConsultation: submission.freeConsultation || false,
                            availability: submission.availability || {},
                            biography: submission.biography || '',
                            updatedAt: new Date(),
                        },
                    },
                    { upsert: true }
                );
                break;

            default:
                return res.status(403).json({ message: 'Unauthorized role for submission' });
        }

        res.status(200).json({
            message: 'Submission successful',
            role: role,
            result: result,
        });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ message: 'Error processing submission', error: error.message });
    }
};

module.exports = {
    registerUser,
    login,
    getCurrentUser,
    handleSubmission,
};
