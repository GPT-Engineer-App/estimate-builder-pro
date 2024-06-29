import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div className="font-bold">RV STATION</div>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/job-selection" className="mr-4">Job Selection</Link>
        <Link to="/customer-info" className="mr-4">Customer Info</Link>
        <Link to="/job-configuration" className="mr-4">Job Configuration</Link>
        <Link to="/estimate-builder" className="mr-4">Build Estimate</Link>
        <Link to="/events">Events</Link> {/* Add Events link */}
      </div>
    </nav>
  );
};

export default Navbar;