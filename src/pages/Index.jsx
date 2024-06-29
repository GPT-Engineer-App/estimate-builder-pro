import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const [estimateNumber, setEstimateNumber] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/estimates/${estimateNumber}`);
      if (response.ok) {
        const estimate = await response.json();
        navigate(`/estimate/${estimate.id}`);
      } else {
        setSearchMessage('Estimate number not found.');
      }
    } catch (error) {
      console.error('Error searching estimate:', error);
      setSearchMessage('An error occurred while searching for the estimate.');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Welcome to the Estimate Builder</h1>
        <p className="text-center">
          Start by selecting a job or entering customer information.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <Link to="/job-selection" className="text-blue-500 underline">
            Job Selection
          </Link>
          <Link to="/customer-info" className="text-blue-500 underline">
            Customer Information
          </Link>
          <Link to="/job-configuration" className="text-blue-500 underline">
            Job Configuration
          </Link>
          <Link to="/estimate-builder" className="text-blue-500 underline">
            Build Estimate
          </Link>
          <Link to="/events" className="text-blue-500 underline">
            Events
          </Link> {/* Add Events link */}
        </div>
        <div className="mt-8 flex justify-center space-x-2">
          <input
            type="text"
            placeholder="Estimate Number"
            value={estimateNumber}
            onChange={(e) => setEstimateNumber(e.target.value)}
            className="p-2 border"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
            Search
          </button>
        </div>
        {searchMessage && (
          <p className="text-center text-red-500 mt-4">{searchMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Index;