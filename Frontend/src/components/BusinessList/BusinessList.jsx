import React, { useState, useEffect, useRef } from 'react';
import './BusinessList.css';

// Modal Component for Contact Information
const BusinessModal = ({ business, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{business.business_name}</h2>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="detail-section">
                        <h3>Entrepreneur Details</h3>
                        <div className="detail-item">
                            <span className="detail-label">Founder</span>
                            <span className="detail-value">{business.founder_name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Business Category</span>
                            <span className="detail-value">{business.business_category}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">About the Business</span>
                            <div className="detail-description">{business.business_description}</div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Contact Information</h3>
                        <div className="detail-item">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">contact@{business.business_name.toLowerCase().replace(/\s/g, '')}.com</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Phone</span>
                            <span className="detail-value">+1 (555) 123-4567</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Office Location</span>
                            <span className="detail-value">New York, NY</span>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button className="invest-button">Schedule Meeting</button>
                        <button className="contact-button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// BusinessCard component updated with modal integration
const BusinessCard = ({ business_name, founder_name, business_description, business_category, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const cardRef = useRef(null);

    // Track mouse position for shine effect
    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            cardRef.current.style.setProperty('--mouse-x', `${x}%`);
            cardRef.current.style.setProperty('--mouse-y', `${y}%`);
        }
    };

    // Apply staggered animation delay
    const style = {
        '--i': index + 1,
        animation: isHovered ? 'none' : `float 3s ease-in-out infinite ${index * 0.2}s`,
    };

    // Business object to pass to modal
    const businessData = {
        business_name,
        founder_name,
        business_description,
        business_category,
    };

    return (
        <>
            <div
                ref={cardRef}
                className={`business-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                style={style}
            >
                <div>
                    <span className="business-tag">{business_category}</span>
                    <h2 className="business-name">{business_name}</h2>
                    <p className="business-text">Founded by: {founder_name}</p>
                    <p className="business-description">{business_description}</p>
                </div>
                <div className="button-container">
                    <button className="details-button" onClick={() => setShowModal(true)}>
                        Explore Investment
                    </button>
                </div>
            </div>

            {}
            <BusinessModal business={businessData} isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    );
};

// Updated BusinessList component with API data fetching
const BusinessList = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from your backend API
        const fetchBusinesses = async () => {
            try {
                // Using your existing API endpoint
                const response = await fetch('http://localhost:5004/api/investors');

                // Check if the response is ok
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setBusinesses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching businesses:', error);
                setError('Failed to load businesses. Please try again later.');
                setLoading(false);
            }
        };

        fetchBusinesses();

        // Trigger the animation after component mounts
        setTimeout(() => {
            setIsVisible(true);
        }, 300);
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading businesses...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    return (
        <div className={`business-container ${isVisible ? 'animated' : ''}`}>
            <div className="business-container-1">
                <h1 className="business-heading">Women-Led Investment Opportunities</h1>
                <div className="business-count">{businesses.length} Businesses Available</div>
            </div>
            <div className="business-list">
                {businesses.map((business, index) => (
                    <BusinessCard
                        key={business._id || index}
                        business_name={business.business_name}
                        founder_name={business.first_name}
                        business_description={business.business_description}
                        business_category={business.business_category}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default BusinessList;
