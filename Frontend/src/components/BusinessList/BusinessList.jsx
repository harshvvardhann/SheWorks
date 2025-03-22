import React, { useState, useEffect, useRef } from 'react';
import './BusinessList.css';

// Enhanced business data with categories
const businesses = [
    {
        name: 'Tech Solutions',
        entrepreneur: 'Jane Doe',
        teamSize: 5,
        description: 'A cutting-edge AI company focused on automation and efficiency.',
        category: 'Technology',
    },
    {
        name: 'Green Energy',
        entrepreneur: 'Sarah Smith',
        teamSize: 8,
        description: 'Sustainable energy solutions for a cleaner future.',
        category: 'Environment',
    },
    {
        name: 'Fashion Forward',
        entrepreneur: 'Emily Johnson',
        teamSize: 4,
        description: 'A trendy fashion brand emphasizing eco-friendly materials.',
        category: 'Fashion',
    },
    {
        name: 'Handmade Crafts',
        entrepreneur: 'Olivia Brown',
        teamSize: 3,
        description: 'Beautiful handcrafted items made with love and precision.',
        category: 'Arts',
    },
    {
        name: 'Wellness Hub',
        entrepreneur: 'Sophia Wilson',
        teamSize: 6,
        description: 'A holistic approach to mental and physical well-being.',
        category: 'Health',
    },
    {
        name: 'Organic Beauty',
        entrepreneur: 'Ava Martinez',
        teamSize: 5,
        description: 'Natural beauty products crafted from organic ingredients.',
        category: 'Beauty',
    },
    {
        name: 'Healthy Bites',
        entrepreneur: 'Mia Anderson',
        teamSize: 4,
        description: 'Nutritious and delicious meal solutions for a healthier lifestyle.',
        category: 'Food',
    },
    {
        name: 'Home Decor',
        entrepreneur: 'Isabella Thomas',
        teamSize: 7,
        description: 'Elegant and modern home decor solutions handcrafted with precision.',
        category: 'Decor',
    },
    {
        name: 'EduCare',
        entrepreneur: 'Amelia White',
        teamSize: 6,
        description: 'Innovative educational tools and methods for better learning.',
        category: 'Education',
    },
];

// Enhanced BusinessCard component with mouse tracking for shine effect
const BusinessCard = ({ name, entrepreneur, teamSize, description, category, index }) => {
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
                <span className="business-tag">{category}</span>
                <h2 className="business-name">{name}</h2>
                <p className="business-text">Founded by: {entrepreneur}</p>
                <p className="business-text">Team Size: {teamSize}</p>
                <p className="business-description">{description}</p>
            </div>
            <div className="button-container">
                <button className="details-button" onClick={() => alert(`Exploring investment opportunities with ${name}!`)}>
                    Explore Investment
                </button>
            </div>
        </div>
    );
};

// Main BusinessList component with added animations and counters
const BusinessList = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the animation after component mounts
        setTimeout(() => {
            setIsVisible(true);
        }, 300);
    }, []);

    return (
        <div className={`business-container ${isVisible ? 'animated' : ''}`}>
            <h1 className="business-heading">Women-Led Investment Opportunities</h1>
            <div className="business-count">{businesses.length} Businesses Available</div>
            <div className="business-list">
                {businesses.map((business, index) => (
                    <BusinessCard key={index} {...business} index={index} />
                ))}
            </div>
        </div>
    );
};

export default BusinessList;
