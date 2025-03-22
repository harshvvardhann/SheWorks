import React, { useState } from 'react';
import './Entrepreneurs1.css';

const businesses = [
    {
        name: 'Tech Solutions',
        entrepreneur: 'Jane Doe',
        teamSize: 5,
        description: 'A cutting-edge AI company focused on automation and efficiency.',
        category: 'Technology',
        stage: 'Scaling',
    },
    {
        name: 'Green Energy',
        entrepreneur: 'Sarah Smith',
        teamSize: 8,
        description: 'Sustainable energy solutions for a cleaner future.',
        category: 'Environment',
        stage: 'Growth',
    },
    {
        name: 'Fashion Forward',
        entrepreneur: 'Emily Johnson',
        teamSize: 4,
        description: 'A trendy fashion brand emphasizing eco-friendly materials.',
        category: 'Fashion',
        stage: 'Startup',
    },
    {
        name: 'Handmade Crafts',
        entrepreneur: 'Olivia Brown',
        teamSize: 3,
        description: 'Beautiful handcrafted items made with love and precision.',
        category: 'Arts',
        stage: 'Early Stage',
    },
    {
        name: 'Wellness Hub',
        entrepreneur: 'Sophia Wilson',
        teamSize: 6,
        description: 'A holistic approach to mental and physical well-being.',
        category: 'Health',
        stage: 'Scaling',
    },
    {
        name: 'Organic Beauty',
        entrepreneur: 'Ava Martinez',
        teamSize: 5,
        description: 'Natural beauty products crafted from organic ingredients.',
        category: 'Beauty',
        stage: 'Growth',
    },
    {
        name: 'Healthy Bites',
        entrepreneur: 'Mia Anderson',
        teamSize: 4,
        description: 'Nutritious and delicious meal solutions for a healthier lifestyle.',
        category: 'Food',
        stage: 'Startup',
    },
    {
        name: 'Home Decor',
        entrepreneur: 'Isabella Thomas',
        teamSize: 7,
        description: 'Elegant and modern home decor solutions handcrafted with precision.',
        category: 'Decor',
        stage: 'Early Stage',
    },
    {
        name: 'EduCare',
        entrepreneur: 'Amelia White',
        teamSize: 6,
        description: 'Innovative educational tools and methods for better learning.',
        category: 'Education',
        stage: 'Growth',
    },
];

const Entrepreneur = ({ business, onShowDetails }) => {
    return (
        <div className="business-card">
            <div>
                <span className="business-tag">{business.category}</span>
                <h2 className="business-name">{business.name}</h2>
                <p className="business-text">Founded by: {business.entrepreneur}</p>
                <p className="business-text">Team Size: {business.teamSize}</p>
            </div>
            <div>
                <button className="details-button" onClick={() => onShowDetails(business)}>
                    View Details
                </button>
            </div>
        </div>
    );
};

const Entrepreneurs = () => {
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    return (
        <div className="business-container">
            <h1 className="business-heading">Women-Led Investment Opportunities</h1>
            <div className="business-count">{businesses.length} Businesses Available</div>
            <div className="business-list">
                {businesses.map((business, index) => (
                    <Entrepreneur key={index} business={business} onShowDetails={setSelectedBusiness} />
                ))}
            </div>
            {selectedBusiness && (
                <div className="modal-overlay" onClick={() => setSelectedBusiness(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedBusiness.name}</h2>
                        <p>
                            <strong>Entrepreneur:</strong> {selectedBusiness.entrepreneur}
                        </p>
                        <p>
                            <strong>Team Size:</strong> {selectedBusiness.teamSize}
                        </p>
                        <p>
                            <strong>Category:</strong> {selectedBusiness.category}
                        </p>
                        <p>
                            <strong>Current Stage:</strong> {selectedBusiness.stage}
                        </p>
                        <p>{selectedBusiness.description}</p>
                        <a href="https://drive.google.com/your-report-link" target="_blank" rel="noopener noreferrer">
                            View Full Report
                        </a>
                        <br />
                        <br />
                        <button className="close-button" onClick={() => setSelectedBusiness(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Entrepreneurs;
