import React, { useEffect, useState } from "react";
import "./InvestorLeaderboard.css";

const investorsData = [
  { rank: 1, name: "Sophia Roberts", amount: "₹5,00,00,000" },
  { rank: 2, name: "Isabella Smith", amount: "₹3,50,00,000" },
  { rank: 3, name: "Olivia Johnson", amount: "₹2,50,00,000" },
  { rank: 4, name: "Emma Williams", amount: "₹1,50,00,000" },
  { rank: 5, name: "Ava Brown", amount: "₹1,20,00,000" },
  { rank: 6, name: "Mia Davis", amount: "₹1,00,00,000" },
  { rank: 7, name: "Charlotte Wilson", amount: "₹95,00,000" },
  { rank: 8, name: "Amelia Moore", amount: "₹90,00,000" },
  { rank: 9, name: "Ella Martinez", amount: "₹85,00,000" },
  { rank: 10, name: "Liam Patel", amount: "₹80,00,000" },
];

const InvestorTable = ({ title, investors }) => {
  return (
    <div className="investor-section">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Investor Name</th>
            <th>Amount Invested (₹)</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((investor, index) => (
            <tr key={index}>
              <td>{investor.rank}</td>
              <td>{investor.name}</td>
              <td>{investor.amount}</td>
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
    <div className="container">
      <h1>Top Investors Leaderboard</h1>
      <InvestorTable title="Top Investors" investors={topInvestors} />
      <InvestorTable title="Other Investors" investors={remainingInvestors} />
    </div>
  );
};

export default InvestorLeaderboard;
