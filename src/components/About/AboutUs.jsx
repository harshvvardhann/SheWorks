import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="header-overlay">
                    <h1>
                        About <span className="highlight">SheWorks</span>
                    </h1>
                    <p className="tagline">Empowering women entrepreneurs through crowdfunding, mentorship, and financial guidance</p>
                </div>
            </div>

            <div className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>
                        At SheWorks, we believe in the power of women-led businesses to transform communities and economies. Our mission is
                        to break down the barriers that women entrepreneurs face by providing accessible capital, personalized guidance, and
                        meaningful connections.
                    </p>
                </div>
                <div className="mission-image">
                    <img
                        src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                        alt="Women entrepreneurs collaborating"
                    />
                </div>
            </div>

            <div className="approach-section">
                <h2>Our Approach</h2>
                <div className="approach-cards">
                    <div className="approach-card">
                        <div className="card-icon">💰</div>
                        <h3>Crowdsourced Funding</h3>
                        <p>
                            We connect women entrepreneurs with a community of backers passionate about supporting women-led ventures
                            through microfinance opportunities.
                        </p>
                    </div>
                    <div className="approach-card">
                        <div className="card-icon">🤖</div>
                        <h3>AI-powered Guidance</h3>
                        <p>
                            Our platform integrates intelligent tools that provide personalized financial advice, helping women manage loans
                            and make sound business decisions.
                        </p>
                    </div>
                    <div className="approach-card">
                        <div className="card-icon">👥</div>
                        <h3>Mentorship Network</h3>
                        <p>
                            We match entrepreneurs with experienced mentors who provide industry insights, practical advice, and ongoing
                            support to help businesses scale successfully.
                        </p>
                    </div>
                </div>
            </div>

            <div className="impact-section">
                <h2>Our Impact</h2>
                <div className="stats-container">
                    <div className="stat-box">
                        <h3>1,200+</h3>
                        <p>Women-led businesses funded</p>
                    </div>
                    <div className="stat-box">
                        <h3>$2.8M</h3>
                        <p>Capital raised</p>
                    </div>
                    <div className="stat-box">
                        <h3>85%</h3>
                        <p>Business success rate</p>
                    </div>
                    <div className="stat-box">
                        <h3>750+</h3>
                        <p>Active mentors</p>
                    </div>
                </div>
            </div>

            <div className="team-section">
                <h2>Our Team</h2>
                <p className="team-intro">
                    SheWorks was founded by a diverse group of entrepreneurs, technologists, and finance experts who share a passion for
                    gender equity and economic empowerment.
                </p>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="member-image">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
                                alt="Sarah Johnson - Founder & CEO"
                            />
                        </div>
                        <h3>Sarah Johnson</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <div className="member-image">
                            <img
                                src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Maria Rodriguez - Head of Partnerships"
                            />
                        </div>
                        <h3>Maria Rodriguez</h3>
                        <p>Head of Partnerships</p>
                    </div>
                    <div className="team-member">
                        <div className="member-image">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                                alt="Aisha Patel - CTO"
                            />
                        </div>
                        <h3>Aisha Patel</h3>
                        <p>CTO</p>
                    </div>
                    <div className="team-member">
                        <div className="member-image">
                            <img
                                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Lisa Chen - Finance Director"
                            />
                        </div>
                        <h3>Lisa Chen</h3>
                        <p>Finance Director</p>
                    </div>
                </div>
            </div>

            <div className="join-section">
                <h2>Join Our Movement</h2>
                <p>
                    Whether you're an entrepreneur seeking support, a potential mentor, or an investor looking to make an impact, there's a
                    place for you in our community.
                </p>
                <div className="cta-buttons">
                    <button className="cta-primary">Get Started</button>
                    <button className="cta-secondary">Become a Mentor</button>
                    <button className="cta-secondary">Invest in Women</button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
