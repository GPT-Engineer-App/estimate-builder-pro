import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
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
          </Link> {/* Add Job Configuration link */}
        </div>
      </div>
    </div>
  );
};

export default Index;