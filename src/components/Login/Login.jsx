import React, { useState } from 'react';
import './Login.css';  // Renamed CSS file for uniqueness

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'entrepreneur'
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form data when toggling
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'entrepreneur'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h1 className="login-form-title">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="login-form-input-container">
              <label className="login-form-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="login-form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
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
          {!isLogin && (
            <>
              <div className="login-form-input-container">
                <label className="login-form-label">Role</label>
                <select
                  name="role"
                  className="login-form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="investor">Investor</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
            </>
          )}
          <button type="submit" className="login-form-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="login-form-toggle">
          <p className="login-form-toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            className="login-form-toggle-button"
            onClick={toggleForm}
            type="button"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;