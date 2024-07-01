import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuildEstimatePage = () => {
  const [jobCodes, setJobCodes] = useState([]);
  const [selectedJobCode, setSelectedJobCode] = useState('');
  const [estimateFields, setEstimateFields] = useState({
    part1: '',
    part2: '',
    labor1: '',
    labor2: ''
  });

  useEffect(() => {
    const fetchJobCodes = async () => {
      try {
        const response = await axios.get('/api/job-codes');
        setJobCodes(response.data);
      } catch (error) {
        console.error('Error fetching job codes:', error);
      }
    };

    fetchJobCodes();
  }, []);

  const handleJobCodeChange = async (event) => {
    const jobCode = event.target.value;
    setSelectedJobCode(jobCode);

    if (jobCode) {
      try {
        const response = await axios.get(`/api/job-configurations/${jobCode}`);
        const jobConfiguration = response.data;
        setEstimateFields({
          part1: jobConfiguration.part1,
          part2: jobConfiguration.part2,
          labor1: jobConfiguration.labor1,
          labor2: jobConfiguration.labor2
        });
      } catch (error) {
        console.error('Error fetching job configuration:', error);
      }
    } else {
      setEstimateFields({
        part1: '',
        part2: '',
        labor1: '',
        labor2: ''
      });
    }
  };

  return (
    <div>
      <h1>Build Estimate</h1>
      <div>
        <label>Select Job Code:</label>
        <select value={selectedJobCode} onChange={handleJobCodeChange}>
          <option value="">Select a job code</option>
          {jobCodes.map(jobCode => (
            <option key={jobCode} value={jobCode}>
              {jobCode}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Part 1:</label>
        <input type="text" value={estimateFields.part1} readOnly />
      </div>
      <div>
        <label>Part 2:</label>
        <input type="text" value={estimateFields.part2} readOnly />
      </div>
      <div>
        <label>Labor 1:</label>
        <input type="text" value={estimateFields.labor1} readOnly />
      </div>
      <div>
        <label>Labor 2:</label>
        <input type="text" value={estimateFields.labor2} readOnly />
      </div>
    </div>
  );
};

export default BuildEstimatePage;