import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MentorRegistrationForm.css';

const MentorRegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        expertise: '',
        yearsOfExperience: '',
        biography: '',
        availability: '',
        offerOneOnOne: false,
        receiveEmails: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, email, expertise, yearsOfExperience, biography, availability } = formData;

        if (!fullName || !email || !expertise || !yearsOfExperience || !biography || !availability) {
            alert('Please fill in all required fields.');
            return;
        }

        if (biography.length > 200) {
            alert('Biography should be 200 characters max.');
            return;
        }

        alert('Mentor Registration Successful!');

        // Reset form
        setFormData({
            fullName: '',
            email: '',
            expertise: '',
            yearsOfExperience: '',
            biography: '',
            availability: '',
            offerOneOnOne: false,
            receiveEmails: false,
        });
        navigate('/');
    };

    return (
        <div className="mentor-form-container">
            <div className="mentor-form-box">
                <h2 className="mentor-form-title">Become a Mentor</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mentor-form-group">
                        <label>
                            Full Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="mentor-form-group">
                        <label>
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className="mentor-form-row">
                        <div className="mentor-form-group">
                            <label>
                                Expertise <span className="required">*</span>
                            </label>
                            <select name="expertise" value={formData.expertise} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="product_management">Product Management</option>
                                <option value="marketing">Marketing</option>
                                <option value="software_development">Software Development</option>
                                <option value="ux_design">UX Design</option>
                                <option value="business_strategy">Business Strategy</option>
                                <option value="finance">Finance</option>
                            </select>
                        </div>

                        <div className="mentor-form-group">
                            <label>
                                Experience <span className="required">*</span>
                            </label>
                            <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required>
                                <option value="">Years</option>
                                <option value="1-3">1-3</option>
                                <option value="4-7">4-7</option>
                                <option value="8-12">8-12</option>
                                <option value="13+">13+</option>
                            </select>
                        </div>
                    </div>

                    <div className="mentor-form-group">
                        <label>
                            Short Bio <span className="required">*</span>
                        </label>
                        <textarea
                            name="biography"
                            maxLength={200}
                            value={formData.biography}
                            onChange={handleChange}
                            required
                            placeholder="Brief description of your background (200 chars max)"
                        />
                        <div className="char-count">{formData.biography.length}/200</div>
                    </div>

                    <div className="mentor-form-group">
                        <label>
                            Availability <span className="required">*</span>
                        </label>
                        <select name="availability" value={formData.availability} onChange={handleChange} required>
                            <option value="">Hours/Month</option>
                            <option value="1-2">1-2 hours</option>
                            <option value="3-5">3-5 hours</option>
                            <option value="6+">6+ hours</option>
                        </select>
                    </div>

                    <div className="mentor-checkbox-container">
                        <label className="mentor-checkbox-label">
                            <input type="checkbox" name="offerOneOnOne" checked={formData.offerOneOnOne} onChange={handleChange} />
                            <span>Available for one-on-one sessions</span>
                        </label>

                        <label className="mentor-checkbox-label">
                            <input type="checkbox" name="receiveEmails" checked={formData.receiveEmails} onChange={handleChange} />
                            <span>Receive mentoring opportunities via email</span>
                        </label>
                    </div>

                    <button type="submit" className="mentor-submit-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MentorRegistrationForm;
