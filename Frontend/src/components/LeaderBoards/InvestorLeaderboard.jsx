import React, { useEffect, useState } from 'react';
import './InvestorLeaderboard.css';

const API_URL = 'http://localhost:5004/api/investors';

const TopInvestorCard = ({ investor, index }) => {
    return (
        <div className={`investor-card top-3`} style={{ '--order': index }}>
            <div className={`investor-rank rank-${index + 1}`}>{index + 1}</div>
            <div className="investor-name">
                {investor.first_name} {investor.middle_name} {investor.last_name}
            </div>
            <div className="investor-amount">₹{investor.amount_wanted_to_invest.toLocaleString()}</div>
        </div>
    );
};

const InvestorTable = ({ title, investors }) => {
    return (
        <div>
            <h2 className="table-title">{title}</h2>
            <table className="investor-table">
                <thead>
                    <tr>
                        <th className="rank-column">Rank</th>
                        <th>Investor Name</th>
                        <th className="amount-column">Amount Invested (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {investors.map((investor, index) => (
                        <tr key={index}>
                            <td className="rank-column">{index + 4}</td>
                            <td className="investor-name">
                                {investor.first_name} {investor.middle_name} {investor.last_name}
                            </td>
                            <td className="amount-column">₹{investor.amount_wanted_to_invest.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const InvestorLeaderboard = () => {
    const [topInvestors, setTopInvestors] = useState([]);
    const [remainingInvestors, setRemainingInvestors] = useState([]);

    useEffect(() => {
        const fetchInvestors = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                // Sort investors by highest amount invested
                const sortedInvestors = data.sort((a, b) => b.amount_wanted_to_invest - a.amount_wanted_to_invest);

                setTopInvestors(sortedInvestors.slice(0, 3));
                setRemainingInvestors(sortedInvestors.slice(3));
            } catch (error) {
                console.error('Error fetching investors:', error);
            }
        };

        fetchInvestors();
    }, []);

    return (
        <div className="investor-leaderboard">
            <h1 className="leaderboard-title">Top Investors Leaderboard</h1>

            <div className="top-investors">
                {topInvestors.map((investor, index) => (
                    <TopInvestorCard key={index} investor={investor} index={index} />
                ))}
            </div>

            <InvestorTable title="Other Top Performers" investors={remainingInvestors} />
        </div>
    );
};

export default InvestorLeaderboard;
