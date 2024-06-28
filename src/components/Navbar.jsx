import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div className="font-bold">RV STATION</div>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/job-selection" className="mr-4">Job Selection</Link>
        <Link to="/customer-info">Customer Info</Link>
      </div>
    </nav>
  );
};

export default Navbar;