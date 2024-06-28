import React, { useState } from 'react';

const JobSelection = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [jobDetails, setJobDetails] = useState({});

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

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Job Selection</h2>
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
        </div>
      )}
    </div>
  );
};

export default JobSelection;