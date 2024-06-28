import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JobSelection = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [jobDetails, setJobDetails] = useState({});
  const [jobs, setJobs] = useState([]);

  const handleJobChange = (event) => {
    const job = event.target.value;
    setSelectedJob(job);
    // Auto-fill functionality can be implemented here
    // For now, we'll just set some dummy data
    if (job === 'CAN Job 1') {
      setJobDetails({
        parts: 'Roof Kit, Roof Membrane',
        labor: 'Repair Description, Notes',
        totalEstimate: '$1000',
      });
    } else {
      setJobDetails({});
    }
  };

  const handleSaveJob = () => {
    setJobs([...jobs, { ...jobDetails, name: selectedJob }]);
    setSelectedJob('');
    setJobDetails({});
  };

  const handleDeleteJob = (jobName) => {
    setJobs(jobs.filter(job => job.name !== jobName));
  };

  return (
    <div className="p-4">
      <header className="bg-blue-500 w-full p-4 text-white text-center">
        <h1 className="text-3xl">RV STATION</h1>
        <nav className="mt-2">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/customer-info">Estimate Form</Link>
        </nav>
      </header>
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Job Configuration</h2>
        <label htmlFor="job" className="block mb-2">Select a CAN Job:</label>
        <select id="job" value={selectedJob} onChange={handleJobChange} className="mb-4 p-2 border">
          <option value="">Select a job</option>
          <option value="CAN Job 1">CAN Job 1</option>
          <option value="CAN Job 2">CAN Job 2</option>
        </select>
        {selectedJob && (
          <div>
            <h3 className="text-xl mb-2">Job Details</h3>
            <p><strong>Parts:</strong> {jobDetails.parts}</p>
            <p><strong>Labor:</strong> {jobDetails.labor}</p>
            <p><strong>Total Estimate:</strong> {jobDetails.totalEstimate}</p>
            <button onClick={handleSaveJob} className="bg-blue-500 text-white p-2 mt-4">Save Job</button>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl mb-2">Existing Jobs</h3>
          <ul>
            {jobs.map((job, index) => (
              <li key={index} className="mb-2">
                <strong>{job.name}</strong>: {job.parts}, {job.labor}, {job.totalEstimate}
                <button onClick={() => handleDeleteJob(job.name)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobSelection;