import React, { useState, useEffect, useRef } from 'react';
import './FinancialLearningPlatform.css';
import { useNavigate } from 'react-router-dom';

const FinancialLearningPlatform = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTerms, setFilteredTerms] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState('medium');
    const modalRef = useRef(null);

    const fundingStages = [
        {
            id: 'pre-seed',
            title: 'Pre-Seed',
            description: 'The earliest stage of funding, often used to develop an initial product or concept.',
            color: '#8A2BE2',
            videoId: 'bvjyaz4ZiVI',
            terms: [
                {
                    name: 'Bootstrapping',
                    description: 'Using personal finances or company revenue to fund growth without external capital.',
                    examples: 'Mailchimp bootstrapped for 17 years before accepting a $12B acquisition.',
                },
                {
                    name: 'Friends & Family Round',
                    description: 'Early capital from personal connections, typically less formal than institutional investment.',
                    examples: 'Spanx founder Sara Blakely initially funded her company with $5,000 of personal savings.',
                },
                {
                    name: 'Convertible Note',
                    description: 'A debt instrument that converts to equity at a future financing round, often with a discount.',
                    examples: "Y Combinator's SAFE (Simple Agreement for Future Equity) is a popular alternative to convertible notes.",
                },
                {
                    name: 'Angel Investor',
                    description:
                        'High-net-worth individuals who provide capital for startups, typically in exchange for equity or convertible debt.',
                    examples: 'Arlan Hamilton of Backstage Capital started as an angel investor focused on underrepresented founders.',
                },
                {
                    name: 'Pitch Deck',
                    description:
                        'A brief presentation that provides investors with an overview of your business plan, products, and growth potential.',
                    examples: "Canva's original pitch deck helped them secure early funding before becoming a $40B company.",
                },
            ],
        },
        {
            id: 'seed',
            title: 'Seed',
            description: 'Capital to help a company grow and establish product-market fit.',
            color: '#4B0082',
            videoId: 'm_557UrDLRY',
            terms: [
                {
                    name: 'Valuation Cap',
                    description: 'The maximum company valuation at which a convertible note or SAFE can convert to equity.',
                    examples: 'If your SAFE has a $5M cap and your Series A is at $10M, SAFE investors get shares at the $5M price.',
                },
                {
                    name: 'Pro Rata Rights',
                    description: 'The right for investors to participate in future rounds to maintain their ownership percentage.',
                    examples:
                        'If an investor owns 5% of your company, pro rata rights allow them to invest enough to maintain that 5% in the next round.',
                },
                {
                    name: 'Post-Money SAFE',
                    description: 'A version of SAFE where the valuation cap is applied after including the SAFE investment amount.',
                    examples: 'Y Combinator introduced the post-money SAFE in 2018 to simplify ownership calculations.',
                },
                {
                    name: 'Cap Table',
                    description: 'A spreadsheet or table showing the equity ownership capitalization for a company.',
                    examples:
                        'Tracking your cap table early helps avoid dilution issues when scaling. Companies like Carta help manage cap tables.',
                },
                {
                    name: 'Burn Rate',
                    description: 'The rate at which a company spends its cash reserves before generating positive cash flow.',
                    examples:
                        'A startup with $1M in the bank and monthly expenses of $100K has a 10-month runway before needing additional funding.',
                },
                {
                    name: 'Traction Metrics',
                    description: 'Measurable evidence that your company is gaining momentum and customer adoption.',
                    examples: 'Rent the Runway shared their customer growth and retention metrics to secure their seed round.',
                },
            ],
        },
        {
            id: 'series-a',
            title: 'Series A',
            description: 'First significant round of venture capital financing, usually after achieving key metrics.',
            color: '#0000CD',
            videoId: 'Fk9BCr5pLTU',
            terms: [
                {
                    name: 'Term Sheet',
                    description: 'Non-binding agreement outlining the terms and conditions of an investment.',
                    examples: 'Key terms typically include valuation, investor rights, and board composition.',
                },
                {
                    name: 'Preferred Shares',
                    description: 'Stock class with additional rights and privileges compared to common stock.',
                    examples: 'Liquidation preference is a key benefit of preferred shares, ensuring investors get paid first in an exit.',
                },
                {
                    name: 'Board Seat',
                    description: "Position on the company's board of directors, often granted to investors after significant funding.'",
                    examples: 'Aileen Lee from Cowboy Ventures often takes board seats in her investments and mentors female founders.',
                },
                {
                    name: 'Liquidation Preference',
                    description:
                        'Provision that determines the order and amount in which investors get paid in case of a liquidation event.',
                    examples:
                        'A 1x liquidation preference means investors get their money back before other shareholders receive anything.',
                },
                {
                    name: 'Lead Investor',
                    description:
                        'The venture capital firm or investor that puts in the largest amount of money and typically sets the terms of the round.',
                    examples:
                        'When 23andMe raised their Series A, Anne Wojcicki secured Sequoia Capital as their lead investor, setting favorable terms.',
                },
                {
                    name: 'Participation Rights',
                    description:
                        'Rights allowing preferred shareholders to receive their money back and then participate in remaining proceeds with common shareholders.',
                    examples:
                        'With participating preferred shares, investors first get their investment back, then share in remaining proceeds proportional to their ownership.',
                },
            ],
        },
        {
            id: 'series-b',
            title: 'Series B',
            description: 'Funding to scale the business after demonstrating a viable business model.',
            color: '#1E90FF',
            videoId: 'DBhSfROq3wU',
            terms: [
                {
                    name: 'Anti-Dilution Protection',
                    description: 'Provisions that protect investors from equity dilution in future down rounds.',
                    examples: 'Full ratchet anti-dilution is the most investor-friendly, while weighted average is more moderate.',
                },
                {
                    name: 'Employee Option Pool',
                    description: 'Shares reserved for employee compensation, typically expanded before new funding rounds.',
                    examples: "A typical option pool might be 10-15% of the company's equity post- Series A or B.",
                },
                {
                    name: 'Strategic Investor',
                    description: 'Investor that provides industry expertise, partnerships, or other strategic value beyond capital.',
                    examples: 'When Glossier raised their Series B, they brought on Sequoia Capital for their scaling expertise.',
                },
                {
                    name: 'Founder Vesting',
                    description: 'Schedule by which founders earn their equity over time, protecting both the company and co-founders.',
                    examples:
                        'Typical founder vesting is over 4 years with a one-year cliff, meaning no equity vests until after the first year.',
                },
                {
                    name: 'Drag-Along Rights',
                    description:
                        'Provision allowing majority shareholders to force minority shareholders to join in the sale of a company.',
                    examples:
                        'If investors with 70% ownership want to sell the company, drag-along rights can require the remaining 30% to sell their shares too.',
                },
                {
                    name: 'Pay-to-Play',
                    description:
                        'Provision requiring investors to participate in future financing rounds to maintain their preferential rights.',
                    examples:
                        "If an investor doesn't participate in the next round proportionally, they might lose their liquidation preference or be converted to common shares.",
                },
            ],
        },
        {
            id: 'series-c',
            title: 'Series C+',
            description: 'Later-stage funding for companies with proven success, often for expansion or acquisitions.',
            color: '#4682B4',
            videoId: 'Th8JoIan4dg',
            terms: [
                {
                    name: 'Down Round',
                    description: 'Financing round at a lower valuation than previous rounds, often diluting existing investors.',
                    examples: 'Instacart raised a down round in 2022, dropping its valuation from $39B to $24B.',
                },
                {
                    name: 'Secondary Sale',
                    description: 'Transaction where existing shareholders sell their shares rather than the company issuing new ones.',
                    examples:
                        'Founder Shan-Lyn Ma of Zola was able to take some money off the table through a secondary sale during their Series D.',
                },
                {
                    name: 'Growth Metrics',
                    description:
                        'Key performance indicators like revenue growth, unit economics, and retention that drive late-stage valuations.',
                    examples: 'SaaS companies at Series C often need to show at least $10M ARR with strong growth rates.',
                },
                {
                    name: 'Pre-IPO Round',
                    description: 'Late-stage private funding round that occurs before a company goes public.',
                    examples:
                        'Bumble raised a pre-IPO round that valued the company at $8B before its public offering reached a $13B valuation.',
                },
                {
                    name: 'Crossover Investors',
                    description:
                        'Investment firms that invest in both private and public companies, typically entering in late-stage rounds.',
                    examples: 'T. Rowe Price and Fidelity often make pre-IPO investments in high-growth startups.',
                },
                {
                    name: 'Mezzanine Financing',
                    description: 'Hybrid of debt and equity financing, typically used as bridge financing before an IPO.',
                    examples: 'Companies might use mezzanine financing with 12-18 month runways to their planned IPO date.',
                },
            ],
        },
        {
            id: 'exit',
            title: 'Exit Options',
            description: 'Ways for founders and investors to realize returns on their investment.',
            color: '#008080',
            videoId: 'HZk_JaJQm8Y',
            terms: [
                {
                    name: 'IPO (Initial Public Offering)',
                    description: 'Process of offering shares to the public on a stock exchange, providing liquidity to shareholders.',
                    examples: "Bumble's 2021 IPO made founder Whitney Wolfe Herd the youngest female self-made billionaire at the time.",
                },
                {
                    name: 'Acquisition',
                    description: "When another company purchases a majority or all of a company's shares or assets.",
                    examples:
                        'When Stitch Fix founder Katrina Lake took her company public, she was holding her baby on the trading floor, becoming an iconic image for women founders.',
                },
                {
                    name: 'Direct Listing',
                    description: 'Alternative to traditional IPOs where companies sell existing shares directly to the public.',
                    examples: 'Companies like Spotify and Slack used direct listings to go public without issuing new shares.',
                },
                {
                    name: 'Lock-up Period',
                    description: 'Time period after an IPO during which company insiders cannot sell their shares.',
                    examples:
                        'Typical lock-up periods range from 90-180 days after the IPO date to prevent insiders from immediately selling shares.',
                },
                {
                    name: 'Earnout',
                    description:
                        'Contingent payment in an acquisition that depends on the acquired company meeting certain performance targets.',
                    examples:
                        'When The Knot acquired WeddingWire, part of the deal included future payments based on revenue growth targets.',
                },
                {
                    name: 'SPAC (Special Purpose Acquisition Company)',
                    description:
                        'A company with no commercial operations formed to raise capital through an IPO for the purpose of acquiring an existing company.',
                    examples: '23andMe went public through a SPAC merger with VG Acquisition Corp in 2021, valued at $3.5B.',
                },
                {
                    name: 'Acqui-hire',
                    description:
                        "Acquisition primarily to gain access to the target company's talent rather than its products or services.",
                    examples:
                        'Many tech giants like Google and Meta regularly perform acqui-hires of promising startups for their engineering teams.',
                },
            ],
        },
        {
            id: 'legal-docs',
            title: 'Legal Documents',
            description: 'Essential legal agreements that define relationships between founders, investors, and the company.',
            color: '#800080',
            videoId: '_QV1YFdO2ZE',
            terms: [
                {
                    name: 'Articles of Incorporation',
                    description: 'Legal document filed with a government body to establish a corporation as a legal entity.',
                    examples: 'Delaware is a popular state for incorporation due to its business-friendly legal framework.',
                },
                {
                    name: 'Bylaws',
                    description: 'Rules governing the internal management of a corporation.',
                    examples:
                        'Bylaws typically cover topics like how board meetings are conducted, voting procedures, and officer responsibilities.',
                },
                {
                    name: 'Stock Purchase',
                    description: 'Contract governing the sale of company shares to investors.',
                    examples: 'SPAs outline the number of shares, price per share, representations and warranties, and closing conditions.',
                },
                {
                    name: "Investors' Rights",
                    description: 'Agreement specifying the rights of investors, including information rights and registration rights.',
                    examples: 'IRAs often include provisions for financial reporting, board observation rights, and inspection rights.',
                },
                {
                    name: 'Right of First Refusal',
                    description: 'Contractual right giving a party the option to enter a business transaction before anyone else.',
                    examples:
                        'If a founder wants to sell their shares, the company or existing investors may have the right to purchase them first.',
                },
                {
                    name: 'Confidentiality (NDA)',
                    description:
                        'Legal contract between parties that outlines confidential information that will be shared but should be restricted from public access.',
                    examples: 'Startups often require NDAs before sharing proprietary information with potential investors or partners.',
                },
            ],
        },
    ];

    useEffect(() => {
        if (searchQuery) {
            const terms = [];
            fundingStages.forEach((stage) => {
                stage.terms.forEach((term) => {
                    if (
                        term.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        term.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ) {
                        terms.push({ ...term, stage: stage.title });
                    }
                });
            });
            setFilteredTerms(terms);
        } else {
            setFilteredTerms([]);
        }
    }, [searchQuery]);

    const handleTermClick = (term) => {
        setSelectedTerm(term);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTerm(null);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    const changeFontSize = (size) => {
        setFontSize(size);
        document.body.className = document.body.className.replace(/font-size-\w+/g, '');
        document.body.classList.add(`font-size-${size}`);
    };

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal]);

    // Handle escape key for modal
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <div className={`financial-learning-platform ${darkMode ? 'dark-mode' : ''}`}>
            <div className="platform-header">
                <h1>Financial Wisdom for Women Founders</h1>
                <p>Navigate your startup's financial journey from idea to exit</p>

                <div className="accessibility-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for financial terms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search for financial terms"
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={() => setSearchQuery('')} aria-label="Clear search">
                                ×
                            </button>
                        )}
                    </div>

                    <div className="controls-container">
                        <button
                            onClick={toggleDarkMode}
                            className="accessibility-button"
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        <div className="font-size-controls">
                            <button
                                onClick={() => changeFontSize('small')}
                                className={`font-size-button ${fontSize === 'small' ? 'active' : ''}`}
                                aria-label="Small font size"
                            >
                                A-
                            </button>
                            <button
                                onClick={() => changeFontSize('medium')}
                                className={`font-size-button ${fontSize === 'medium' ? 'active' : ''}`}
                                aria-label="Medium font size"
                            >
                                A
                            </button>
                            <button
                                onClick={() => changeFontSize('large')}
                                className={`font-size-button ${fontSize === 'large' ? 'active' : ''}`}
                                aria-label="Large font size"
                            >
                                A+
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {searchQuery && (
                <div className="search-results">
                    <h2>Search Results for "{searchQuery}"</h2>
                    {filteredTerms.length > 0 ? (
                        <div className="search-terms-grid">
                            {filteredTerms.map((term, index) => (
                                <div key={index} className="search-term-card" onClick={() => handleTermClick(term)}>
                                    <span className="term-stage-tag">{term.stage}</span>
                                    <h3>{term.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No terms found matching your search.</p>
                    )}
                </div>
            )}

            {!searchQuery && (
                <div className="funding-journey" role="main">
                    {fundingStages.map((stage) => (
                        <div
                            id={stage.id}
                            key={stage.id}
                            className="funding-stage"
                            style={{ borderColor: stage.color }}
                            tabIndex="0"
                            role="region"
                        >
                            <div className="stage-header" style={{ backgroundColor: stage.color }}>
                                <h2>{stage.title}</h2>
                            </div>
                            <div className="stage-content">
                                <p className="stage-description">{stage.description}</p>
                                <div className="video-container">
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={`https://www.youtube.com/embed/${stage.videoId}`}
                                        title={`${stage.title} Funding Stage Overview`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <h3>Key Terms to Know</h3>
                                <div className="terms-container">
                                    {stage.terms.map((term) => (
                                        <div
                                            key={term.name}
                                            className="term-card"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleTermClick(term);
                                            }}
                                            tabIndex="0"
                                            role="button"
                                            aria-label={`Learn about ${term.name}`}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.stopPropagation();
                                                    handleTermClick(term);
                                                }
                                            }}
                                        >
                                            <h4>{term.name}</h4>
                                            <p className="term-preview">{term.description.substring(0, 60)}...</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {searchQuery && (
                <div className="search-results">
                    <h2>Search Results for "{searchQuery}"</h2>
                    {filteredTerms.length > 0 ? (
                        <div className="search-terms-grid">
                            {filteredTerms.map((term, index) => (
                                <div key={index} className="search-term-card" onClick={() => handleTermClick(term)}>
                                    <span className="term-stage-tag">{term.stage}</span>
                                    <h3>{term.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No terms found matching your search.</p>
                    )}
                </div>
            )}
            {/* Resources section */}
            <section className="resources-section">
                <h2>Additional Resources</h2>
                <div className="resources-grid">
                    <div className="resource-card">
                        <div className="resource-icon">📚</div>
                        <h3>Financial Glossary</h3>
                        <p>Complete dictionary of startup funding terms in downloadable PDF format.</p>
                        <a href="https://files.consumerfinance.gov/f/documents/cfpb_building_block_activities_glossary.pdf">
                            <button className="resource-button">Download PDF</button>
                        </a>
                    </div>
                    <div className="resource-card">
                        <div className="resource-icon">🎙️</div>
                        <h3>Founder Interviews</h3>
                        <p>Podcast series featuring successful women founders sharing their funding journeys.</p>
                        <a href="https://youtube.com/playlist?list=PLE0Jo6NF_JYOMvJNqn7jrWEwWn_WjZlKV&si=Vfh2AV9n3B2bsJBq">
                            <button className="resource-button">Listen Now</button>
                        </a>
                    </div>
                    <div className="resource-card">
                        <div className="resource-icon">📊</div>
                        <h3>Financial Templates</h3>
                        <p>Customizable financial models and cap table templates for your startup.</p>
                        <a href="https://www.canva.com/design/DAGiggTZvIY/AkDsMXuHsRi3SNoZzmPJqg/edit">
                            <button className="resource-button">Access Templates</button>
                        </a>
                    </div>
                    <div className="resource-card">
                        <div className="resource-icon">👩‍💼</div>
                        <h3>Mentor Network</h3>
                        <p>Connect with experienced founders and investors for personalized advice.</p>
                        <a href="">
                            <button
                                className="resource-button"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                Join Network
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {showModal && selectedTerm && (
                <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div className="modal-content" ref={modalRef}>
                        <button className="close-button" onClick={closeModal} aria-label="Close">
                            ×
                        </button>
                        <h3 id="modal-title" className="term-title">
                            {selectedTerm.name}
                        </h3>
                        <div className="term-full-description">
                            <p>{selectedTerm.description}</p>
                            <h4>Real-World Examples</h4>
                            <p className="term-examples">{selectedTerm.examples}</p>

                            {/* Additional content in modal */}
                            <div className="related-resources">
                                <h4>Related Resources</h4>
                                <ul className="resource-links">
                                    <li>
                                        <a
                                            href="https://www.youtube.com/watch?v=aKq8bkY5eTU"
                                            aria-label={`Watch video about ${selectedTerm.name}`}
                                        >
                                            📹 Watch explanation video
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" aria-label={`Read case study about ${selectedTerm.name}`}>
                                            📝 Read case study
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" aria-label={`Download template for ${selectedTerm.name}`}>
                                            📄 Download template
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="community-tips">
                                <h4>Community Tips</h4>
                                <div className="community-tip">
                                    <p>
                                        "When negotiating {selectedTerm.name}, always get a lawyer to review the terms. I saved myself from
                                        a bad deal by understanding the implications."
                                    </p>
                                    <span className="tip-author">— Sarah Chen, Founder & General Partner</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="action-button primary">Save to My Terms</button>
                            <button className="action-button secondary">Share</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinancialLearningPlatform;
