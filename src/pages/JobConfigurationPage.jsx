import React, { useState } from 'react';
import axios from 'axios';

const JobConfigurationPage = () => {
  const [jobCode, setJobCode] = useState('');
  const [fieldValues, setFieldValues] = useState({
    part1: '',
    part2: '',
    labor1: '',
    labor2: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFieldValues({
      ...fieldValues,
      [name]: value
    });
  };

  const handleSaveJobConfiguration = async () => {
    try {
      await axios.post('/api/job-configurations', {
        jobCode,
        ...fieldValues
      });
      alert('Job configuration saved successfully!');
    } catch (error) {
      console.error('Error saving job configuration:', error);
    }
  };

  return (
    <div>
      <h1>Job Configuration</h1>
      <div>
        <label>Job Code:</label>
        <input type="text" value={jobCode} onChange={(e) => setJobCode(e.target.value)} />
      </div>
      <div>
        <label>Part 1:</label>
        <input type="text" name="part1" value={fieldValues.part1} onChange={handleInputChange} />
      </div>
      <div>
        <label>Part 2:</label>
        <input type="text" name="part2" value={fieldValues.part2} onChange={handleInputChange} />
      </div>
      <div>
        <label>Labor 1:</label>
        <input type="text" name="labor1" value={fieldValues.labor1} onChange={handleInputChange} />
      </div>
      <div>
        <label>Labor 2:</label>
        <input type="text" name="labor2" value={fieldValues.labor2} onChange={handleInputChange} />
      </div>
      <button onClick={handleSaveJobConfiguration}>Save Job Configuration</button>
    </div>
  );
};

export default JobConfigurationPage;