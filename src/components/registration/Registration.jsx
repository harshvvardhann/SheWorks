import React, { useState } from 'react';
import './Registration.css'; // Import the CSS file

const Registeration = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Register</h1>
        <div className="options-container">
          <div
            className={`option ${selectedOption === 'investor' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('investor')}
          >
            Investor
          </div>
          <div
            className={`option ${selectedOption === 'entrepreneur' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('entrepreneur')}
          >
            Entrepreneur
          </div>
        </div>
        {selectedOption && (
          <div className="description">
            {selectedOption === 'investor'
              ? 'As an Investor, you can browse and invest in exciting new startups.'
              : 'As an Entrepreneur, you can register your startup and find investors.'}
          </div>
        )}
        {selectedOption && (
          <button
            className="proceed-button"
            onClick={() => alert(`Proceeding as ${selectedOption}`)}
          >
            Proceed as {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
          </button>
        )}
      </div>
    </div>
  );
};

export default Registeration;