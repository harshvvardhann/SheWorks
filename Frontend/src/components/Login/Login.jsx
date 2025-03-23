import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            // Make POST request to backend for login
            const response = await axios.post('http://192.168.1.98:5004/api/users/login', formData);

            if (response.status == 200) {
                navigate('/');
            }
            // Redirect to dashboard after successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form-card">
                <h1 className="login-form-title">Login</h1>
                {error && <div className="login-form-error">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-input-container">
                        <label className="login-form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="login-form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="login-form-input-container">
                        <label className="login-form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="login-form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-form-button" disabled={loading} onClick={handleSubmit}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="login-form-toggle">
                    <p className="login-form-toggle-text">Don't have an account?</p>
                    <Link to="/signup" className="login-form-toggle-button">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
