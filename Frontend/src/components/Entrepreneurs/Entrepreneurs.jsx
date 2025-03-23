import React, { useState, useEffect } from 'react';
import './Entrepreneurs1.css';
import axios from 'axios';

const Entrepreneur = ({ business, onShowDetails }) => {
    return (
        <div className="business-card">
            <div>
                <span className="business-tag">{business.field_of_business}</span>
                <h2 className="business-name">{business.business_name}</h2>
                <p className="business-text">Stage: {business.current_stage}</p>
                <p className="business-text">Team Size: {business.team_size}</p>
            </div>
            <div>
                <button className="details-button" onClick={() => onShowDetails(business)}>
                    View Details
                </button>
            </div>
        </div>
    );
};

const BusinessDetailsModal = ({ business, onClose }) => {
    if (!business) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{business.business_name}</h2>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="detail-section">
                        <div className="detail-item">
                            <span className="detail-label">Field of Business:</span>
                            <span className="detail-value">{business.field_of_business}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Founder:</span>
                            <span className="detail-value">{business.first_name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Current Stage:</span>
                            <span className="detail-value">{business.current_stage}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Team Size:</span>
                            <span className="detail-value">{business.team_size}</span>
                        </div>
                        {business.business_description && (
                            <div className="detail-item">
                                <span className="detail-label">Description:</span>
                                <p className="detail-description">{business.business_description}</p>
                            </div>
                        )}
                        {business.location && (
                            <div className="detail-item">
                                <span className="detail-label">Location:</span>
                                <span className="detail-value">{business.location}</span>
                            </div>
                        )}
                        {business.funding_needed && (
                            <div className="detail-item">
                                <span className="detail-label">Funding Needed:</span>
                                <span className="detail-value">${business.funding_needed.toLocaleString()}</span>
                            </div>
                        )}
                        {business.founding_year && (
                            <div className="detail-item">
                                <span className="detail-label">Founded:</span>
                                <span className="detail-value">{business.founding_year}</span>
                            </div>
                        )}
                        {business.website && (
                            <div className="detail-item">
                                <span className="detail-label">Website:</span>
                                <a href={business.website} target="_blank" rel="noopener noreferrer" className="detail-link">
                                    {business.website}
                                </a>
                            </div>
                        )}
                        {business.contact_email && (
                            <div className="detail-item">
                                <span className="detail-label">Contact Email:</span>
                                <a href={`mailto:${business.contact_email}`} className="detail-link">
                                    {business.contact_email}
                                </a>
                            </div>
                        )}
                    </div>

                    {business.achievements && business.achievements.length > 0 && (
                        <div className="detail-section">
                            <h3>Achievements</h3>
                            <ul className="achievements-list">
                                {business.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="modal-actions">
                        <button className="contact-button">Contact Entrepreneur</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Entrepreneurs = () => {
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await axios.get('http://localhost:5004/api/entrepreneurs');

                setBusinesses(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching businesses:', err);
                setError('Failed to load businesses. Please try again later.');
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const closeModal = () => {
        setSelectedBusiness(null);
    };

    // Close modal when clicking escape key
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (selectedBusiness) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [selectedBusiness]);

    return (
        <div className="business-container">
            <h1 className="business-heading">Women-Led Investment Opportunities</h1>

            {loading ? (
                <div className="loading-indicator">Loading businesses...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <div className="business-count">{businesses.length} Businesses Available</div>
                    <div className="business-list">
                        {businesses.length > 0 ? (
                            businesses.map((business, index) => (
                                <Entrepreneur key={business._id || index} business={business} onShowDetails={setSelectedBusiness} />
                            ))
                        ) : (
                            <div className="no-businesses">No businesses available at the moment.</div>
                        )}
                    </div>
                </>
            )}

            {selectedBusiness && <BusinessDetailsModal business={selectedBusiness} onClose={closeModal} />}
        </div>
    );
};

export default Entrepreneurs;
