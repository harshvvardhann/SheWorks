import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestorRegistrationForm.css'; // Import the CSS file

const InvestorRegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessField: '',
        organization: '',
        description: '',
        investmentRange: '',
        mentorship: false,
        receiveMails: false,
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
        const { firstName, lastName, businessField, organization, description, investmentRange } = formData;
        if (!firstName || !lastName || !businessField || !organization || !description || !investmentRange) {
            alert('Please fill in all required fields.');
            return;
        }
        if (description.length > 200) {
            alert('Description should be 200 words max.');
            return;
        }
        alert('Investor Registration Successful!');
        setFormData({
            firstName: '',
            lastName: '',
            businessField: '',
            organization: '',
            description: '',
            investmentRange: '',
            mentorship: false,
            receiveMails: false,
        });
        navigate('/');
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2 className="form-title">Investor Registration</h2>
                <form onSubmit={handleSubmit}>
                    {['firstName', 'lastName', 'organization'].map((field) => (
                        <div key={field} className="form-group">
                            <label>{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
                            <input type="text" name={field} value={formData[field]} onChange={handleChange} required />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Field of Business:</label>
                        <select name="businessField" value={formData.businessField} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="technology">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="real_estate">Real Estate</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Business Description:</label>
                        <textarea name="description" maxLength={200} value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Investment Range (in INR):</label>
                        <select name="investmentRange" value={formData.investmentRange} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="50000-100000">₹50K - ₹1L</option>
                            <option value="100000-500000">₹1L - ₹5L</option>
                            <option value="500000-1000000">₹5L - ₹10L</option>
                            <option value="1000000+">₹10L+</option>
                        </select>
                    </div>
                    <label className="checkbox-label">
                        <input type="checkbox" name="mentorship" checked={formData.mentorship} onChange={handleChange} />I am interested in
                        providing free mentorship to entrepreneurs.
                    </label>
                    <label className="checkbox-label">
                        <input type="checkbox" name="receiveMails" checked={formData.receiveMails} onChange={handleChange} />I want to
                        receive emails from you.
                    </label>
                    <button type="submit" className="submit-button">
                        Register Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InvestorRegistrationForm;
