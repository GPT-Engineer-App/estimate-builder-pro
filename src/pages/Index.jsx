import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <header className="bg-blue-500 w-full p-4 text-white text-center">
        <h1 className="text-3xl">RV STATION</h1>
      </header>
      <div className="mt-8">
        <h2 className="text-2xl text-center">Welcome to the Estimate Builder</h2>
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
          <Link to="/estimate-form" className="text-blue-500 underline">
            Estimate Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;