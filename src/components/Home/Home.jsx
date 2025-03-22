import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the external CSS file

const SheWorks = () => {
    const carouselRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState(0);

    const programsData = [
        {
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
            icon: 'fas fa-rocket',
            title: 'Leadership Development',
            description: 'Develop essential leadership skills for executive roles',
        },
        {
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
            icon: 'fas fa-chart-line',
            title: 'Entrepreneurship',
            description: 'Launch and scale your business with expert guidance',
        },
        {
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            icon: 'fas fa-graduation-cap',
            title: 'Tech Skills',
            description: 'Master in-demand technical skills for the future',
        },
    ];

    const storiesData = [
        {
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            quote: 'SheWorks transformed my career trajectory. The mentorship and community support were invaluable.',
            name: 'Sarah Johnson',
            position: 'CEO & Founder',
            company: 'Tech Innovators',
        },
        {
            image: 'https://randomuser.me/api/portraits/women/28.jpg',
            quote: 'The leadership program gave me the confidence to take my career to the next level.',
            name: 'Emily Chen',
            position: 'Senior Director',
            company: 'Global Solutions',
        },
        {
            image: 'https://randomuser.me/api/portraits/women/59.jpg',
            quote: 'Thanks to SheWorks, I successfully transitioned into tech and doubled my income.',
            name: 'Maria Rodriguez',
            position: 'Tech Lead',
            company: 'Innovation Labs',
        },
        {
            image: 'https://randomuser.me/api/portraits/women/75.jpg',
            quote: 'The networking opportunities at SheWorks led to my dream job and meaningful connections.',
            name: 'Jennifer Taylor',
            position: 'Marketing VP',
            company: 'Digital Brands',
        },
    ];

    useEffect(() => {
        let animationFrameId;

        const autoScroll = () => {
            setCurrentPosition((prev) => {
                const newPosition = prev - 1;
                const totalWidth = carouselRef.current?.scrollWidth || 0;
                return Math.abs(newPosition) >= totalWidth ? 0 : newPosition;
            });
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        autoScroll();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        e.target.reset();
    };

    return (
        <>
            <div className="mainClass">
                {/* Header */}
                <header>
                    <div className="container">
                        <nav>
                            <div className="logo">
                                <i className="fas fa-graduation-cap"></i>
                                <h1>SheWorks</h1>
                            </div>
                            <ul className="nav-links">
                                <li>
                                    <Link to="/ai">AI</Link>
                                </li>
                                <li>
                                    <Link to="/financiallearningplatform">Finance Learning</Link>
                                </li>
                                <li>
                                    <Link to="/leaderboard">Community</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                            <div className="auth-buttons">
                                <a href="#" className="login-btn">
                                    Login
                                </a>
                                <a href="#" className="signup-btn">
                                    Sign Up
                                </a>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <h1>Empowering Women to Thrive in Their Careers</h1>
                            <p>Join thousands of women building successful careers and businesses</p>
                            <a href="#" className="cta-btn">
                                Start Your Journey
                            </a>
                            <p className="join-text">Join 50,000+ successful women</p>
                        </div>
                        <div className="hero-image">
                            <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1" alt="Woman using laptop" />
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="programs">
                    <div className="program-cards">
                        {programsData.map((program, index) => (
                            <div className="program-card" key={index}>
                                <div className="card-image">
                                    <img src={program.image} alt={program.title} />
                                </div>
                                <div className="card-icon">
                                    <i className={program.icon}></i>
                                </div>
                                <div className="card-content">
                                    <h3>{program.title}</h3>
                                    <p>{program.description}</p>
                                    <a href="#" className="learn-more">
                                        Learn More <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className="success-stories">
                    <div className="container">
                        <h2 className="success-stories-text">Success Stories</h2>
                        <div className="story-carousel-container">
                            <div className="story-carousel" ref={carouselRef} style={{ transform: `translateX(${currentPosition}px)` }}>
                                {[...storiesData, ...storiesData].map((story, index) => (
                                    <div className="story-card" key={index}>
                                        <div className="profile-image">
                                            <img src={story.image} alt={story.name} />
                                        </div>
                                        <div className="quote">"</div>
                                        <p className="testimonial">{story.quote}</p>
                                        <h4>{story.name}</h4>
                                        <p className="position">
                                            {story.position}
                                            <br />
                                            {story.company}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats">
                    <div className="container">
                        <div className="stat-item">
                            <h3>50K+</h3>
                            <p>Active Members</p>
                        </div>
                        <div className="stat-item">
                            <h3>1000+</h3>
                            <p>Success Stories</p>
                        </div>
                        <div className="stat-item">
                            <h3>200+</h3>
                            <p>Expert Mentors</p>
                        </div>
                        <div className="stat-item">
                            <h3>90%</h3>
                            <p>Career Growth</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta">
                    <div className="container">
                        <h2>Ready to Transform Your Career?</h2>
                        <p>Join our community of ambitious women</p>
                        <a href="#" className="cta-btn">
                            Get Started
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer>
                    <div className="container">
                        <div className="footer-columns">
                            <div className="footer-column">
                                <h3>SheWorks</h3>
                                <p>Empowering women to achieve their professional goals</p>
                                <div className="social-links">
                                    <a href="#">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="footer-column">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li>
                                        <a href="#">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#">Programs</a>
                                    </li>
                                    <li>
                                        <a href="#">Success Stories</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h4>Resources</h4>
                                <ul>
                                    <li>
                                        <a href="#">Blog</a>
                                    </li>
                                    <li>
                                        <a href="#">Careers</a>
                                    </li>
                                    <li>
                                        <a href="#">Events</a>
                                    </li>
                                    <li>
                                        <a href="#">Support</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h4>Newsletter</h4>
                                <p>Stay updated with our latest news and events</p>
                                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                                    <input type="email" placeholder="Enter your email" required />
                                    <button type="submit">Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="copyright">
                            <p>&copy; 2024 SheWorks. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default SheWorks;
