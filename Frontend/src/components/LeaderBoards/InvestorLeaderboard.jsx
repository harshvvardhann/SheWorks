import React, { useEffect, useState } from 'react';
import './InvestorLeaderboard.css';

const investorsData = [
    { rank: 1, name: 'Sophia Roberts', amount: '₹5,00,00,000' },
    { rank: 2, name: 'Isabella Smith', amount: '₹3,50,00,000' },
    { rank: 3, name: 'Olivia Johnson', amount: '₹2,50,00,000' },
    { rank: 4, name: 'Emma Williams', amount: '₹1,50,00,000' },
    { rank: 5, name: 'Ava Brown', amount: '₹1,20,00,000' },
    { rank: 6, name: 'Mia Davis', amount: '₹1,00,00,000' },
    { rank: 7, name: 'Charlotte Wilson', amount: '₹95,00,000' },
    { rank: 8, name: 'Amelia Moore', amount: '₹90,00,000' },
    { rank: 9, name: 'Ella Martinez', amount: '₹85,00,000' },
    { rank: 10, name: 'Liam Patel', amount: '₹80,00,000' },
];

const TopInvestorCard = ({ investor, index }) => {
    return (
        <div className={`investor-card top-3`} style={{ '--order': index }}>
            <div className={`investor-rank rank-${investor.rank}`}>{investor.rank}</div>
            <div className="investor-name">{investor.name}</div>
            <div className="investor-amount">{investor.amount}</div>
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
                        <tr key={investor.rank} style={{ '--row-index': index }}>
                            <td className="rank-column">{investor.rank}</td>
                            <td className="invester-name">{investor.name}</td>
                            <td className="amount-column">{investor.amount}</td>
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
        setTopInvestors(investorsData.slice(0, 3));
        setRemainingInvestors(investorsData.slice(3));
    }, []);

    return (
        <>
            <div className="investor-leaderboard">
                <h1 className="leaderboard-title">Top Investors Leaderboard</h1>

                <div className="top-investors">
                    {topInvestors.map((investor, index) => (
                        <TopInvestorCard key={investor.rank} investor={investor} index={index} />
                    ))}
                </div>

                <InvestorTable title="Other Top Performers" investors={remainingInvestors} />
            </div>
        </>
    );
};

export default InvestorLeaderboard;
