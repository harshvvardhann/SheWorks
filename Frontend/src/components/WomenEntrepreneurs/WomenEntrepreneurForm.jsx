import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './WomenEntrepreneurForm.css';

const WomenEntrepreneurForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        business: '',
        mobileNo: '',
        organisation: '',
        fieldOfBusiness: '',
        currentStage: '',
        description: '',
        teamSize: '',
        report: '',
        investment: '',
        financialTermsAware: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [animateForm, setAnimateForm] = useState(false);

    useEffect(() => {
        // Trigger the form animation after component mounts
        setTimeout(() => {
            setAnimateForm(true);
        }, 300);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Simulating form submission
        setTimeout(() => {
            console.log('Form Submitted', formData);
            // Reset form or redirect after submission
            // setFormData({...}) - uncomment if you want to reset
        }, 1000);
        navigate('/');
    };

    const currentStageOptions = ['Idea Stage', 'Prototype', 'Pre-Revenue', 'Revenue Generating', 'Scaling', 'Established'];

    const businessFieldOptions = [
        'Technology',
        'Healthcare',
        'Education',
        'Retail',
        'Food & Beverage',
        'Fashion',
        'Services',
        'Manufacturing',
        'Finance',
        'Other',
    ];

    return (
        <div className={`form-container ${animateForm ? 'animated' : ''} ${submitted ? 'form-submitted' : ''}`}>
            <div className="form-header">
                <h2 className="form-title">Women Entrepreneur </h2>
                <p className="form-subtitle">Join our network of successful business leaders</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Business Name</label>
                        <input
                            type="text"
                            name="business"
                            value={formData.business}
                            onChange={handleChange}
                            placeholder="Your business or startup name"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            placeholder="Your contact number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Organisation</label>
                        <input
                            type="text"
                            name="organisation"
                            value={formData.organisation}
                            onChange={handleChange}
                            placeholder="Your organization or company"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Field of Business</label>
                        <select name="fieldOfBusiness" value={formData.fieldOfBusiness} onChange={handleChange}>
                            <option value="">Select your industry</option>
                            {businessFieldOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Current Business Stage</label>
                        <select name="currentStage" value={formData.currentStage} onChange={handleChange}>
                            <option value="">Select current stage</option>
                            {currentStageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>Business Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your business, mission, and vision"
                        rows="4"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Team Size</label>
                        <input
                            type="number"
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleChange}
                            placeholder="Number of team members"
                            min="1"
                        />
                    </div>
                    <div className="form-group">
                        <label>Financial Reports</label>
                        <select name="report" value={formData.report} onChange={handleChange}>
                            <option value="">Select option</option>
                            <option value="Yes">Available</option>
                            <option value="No">Not Available</option>
                            <option value="In Progress">In Progress</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Investment Needed</label>
                        <input
                            type="text"
                            name="investment"
                            value={formData.investment}
                            onChange={handleChange}
                            placeholder="Amount in USD (if applicable)"
                        />
                    </div>
                    <div className="form-group">
                        <label>Financial Terms Awareness</label>
                        <select name="financialTermsAware" value={formData.financialTermsAware} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>

                <div className="checkbox-group">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I agree to the terms and conditions</label>
                </div>

                <button type="submit" className="submit-button">
                    {submitted ? 'Submitting...' : 'Register Now'}
                </button>

                {submitted && <div className="success-message">Form submitted successfully!</div>}
            </form>
        </div>
    );
};

export default WomenEntrepreneurForm;
