import React, { useState, useEffect, useRef } from 'react';
import './BusinessList.css';

// BusinessCard component updated to match MongoDB fields
const BusinessCard = ({ business_name, founder_name, business_description, business_category, index }) => {
    const [isHovered, setIsHovered] = useState(false);
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

    return (
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
                <button className="details-button" onClick={() => alert(`Exploring investment opportunities with ${business_name}!`)}>
                    Explore Investment
                </button>
            </div>
        </div>
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
            <div className="modal-actions">
                <button className="contact-button">Contact Entrepreneur</button>
            </div>
        </div>
    );
};

export default BusinessList;
