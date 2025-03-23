import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.css'; // Import the signup-specific CSS

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'entrepreneur',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Make the API request to register the user
            const response = await axios.post('http://192.168.1.98:5004/api/users/register', formData);

            if (response.status === 201) {
                console.log(formData);

                // If registration is successful, navigate to the appropriate page based on the role
                switch (formData.role) {
                    case 'entrepreneur':
                        navigate('/entrepreneur-form');
                        break;
                    case 'investor':
                        navigate('/investorregistrationform');
                        break;
                    case 'mentor':
                        navigate('/mentorregistration');
                        break;
                    default:
                        navigate('/investorregistrationform');
                }
            }
        } catch (err) {
            // If error occurs during the API call, set the error message
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-form-container">
            <div className="signup-form-card">
                <h1 className="signup-form-title">Sign Up</h1>
                {error && <div className="signup-form-error">{error}</div>}
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-form-input-container">
                        <label className="signup-form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="signup-form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="signup-form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-input-container">
                        <label className="signup-form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="signup-form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="signup-form-role-container">
                        <div className="signup-form-role-title">I am a:</div>
                        <div className="signup-form-role-options">
                            <div className="signup-form-role-option">
                                <input
                                    type="radio"
                                    id="role-entrepreneur"
                                    name="role"
                                    value="entrepreneur"
                                    checked={formData.role === 'entrepreneur'}
                                    onChange={handleChange}
                                    className="signup-form-role-radio"
                                />
                                <label htmlFor="role-entrepreneur" className="signup-form-role-label">
                                    Entrepreneur
                                </label>
                            </div>
                            <div className="signup-form-role-option">
                                <input
                                    type="radio"
                                    id="role-investor"
                                    name="role"
                                    value="investor"
                                    checked={formData.role === 'investor'}
                                    onChange={handleChange}
                                    className="signup-form-role-radio"
                                />
                                <label htmlFor="role-investor" className="signup-form-role-label">
                                    Investor
                                </label>
                            </div>
                            <div className="signup-form-role-option">
                                <input
                                    type="radio"
                                    id="role-mentor"
                                    name="role"
                                    value="mentor"
                                    checked={formData.role === 'mentor'}
                                    onChange={handleChange}
                                    className="signup-form-role-radio"
                                />
                                <label htmlFor="role-mentor" className="signup-form-role-label">
                                    Mentor
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="signup-form-button" disabled={loading} onClick={handleSubmit}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="signup-form-toggle">
                    <p className="signup-form-toggle-text">Already have an account?</p>
                    <Link to="/login" className="signup-form-toggle-button">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
