import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EstimateBuilder = () => {
  const [customer, setCustomer] = useState({
    estimateNumber: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    unitDescription: '',
    vin: '',
    advisor: '',
    paymentType: '',
    deductible: '',
    date: '',
  });

  const [jobCode, setJobCode] = useState('');
  const [jobCodes, setJobCodes] = useState([]); // New state for job codes
  const [parts, setParts] = useState({
    roofKit: '',
    roofMembrane: '',
    slfLvlDicor: '',
    nonLvlDicor: '',
    roofScrews: '',
    glue: '',
    additionalParts: '',
  });
  const [labor, setLabor] = useState({
    repairDescription: '',
    notes: '',
    hrs: '',
    laborHr: '',
    sublet: '',
    extras: '',
    labor: '',
    shopSupplies: '',
    tax: '',
    totalEstimate: '',
  });
  const [totalEstimate, setTotalEstimate] = useState(0);

  useEffect(() => {
    fetchJobCodes(); // Fetch job codes when component mounts
  }, []);

  const fetchJobCodes = async () => {
    try {
      const response = await fetch('/api/job-codes'); // Adjust the endpoint as needed
      const data = await response.json();
      setJobCodes(data);
    } catch (error) {
      console.error('Error fetching job codes:', error);
    }
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleJobCodeChange = async (event) => {
    const selectedJobCode = event.target.value;
    setJobCode(selectedJobCode);
    try {
      const response = await fetch(`/api/job-codes/${selectedJobCode}`); // Adjust the endpoint as needed
      const data = await response.json();
      setParts(data.parts);
      setLabor(data.labor);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const handlePartsChange = (event) => {
    const { name, value } = event.target;
    setParts((prevParts) => ({
      ...prevParts,
      [name]: value,
    }));
  };

  const handleLaborChange = (event) => {
    const { name, value } = event.target;
    setLabor((prevLabor) => ({
      ...prevLabor,
      [name]: value,
    }));
  };

  const handleSaveEstimate = () => {
    // Save estimate logic here
    console.log('Estimate saved:', { customer, jobCode, parts, labor, totalEstimate });
  };

  useEffect(() => {
    // Calculate total estimate
    const partsTotal = Object.values(parts).reduce((acc, part) => acc + parseFloat(part || 0), 0);
    const laborTotal = Object.values(labor).reduce((acc, laborItem) => acc + parseFloat(laborItem || 0), 0);
    setTotalEstimate(partsTotal + laborTotal);
  }, [parts, labor]);

  return (
    <div className="p-4">
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <div className="font-bold">RV STATION</div>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/job-configuration">Job Configuration</Link>
        </div>
      </nav>
      <h2 className="text-2xl mb-4">Estimate Builder</h2>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Customer Information</h3>
        {Object.keys(customer).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={customer[key]}
              onChange={handleCustomerChange}
              className="p-2 border w-full"
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Job Code Selection</h3>
        <label htmlFor="jobCode" className="block mb-2">Select Job Code:</label>
        <select id="jobCode" value={jobCode} onChange={handleJobCodeChange} className="mb-4 p-2 border w-full">
          <option value="">Select a job code</option>
          {jobCodes.map((job) => (
            <option key={job.jobCode} value={job.jobCode}>{job.jobCode}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Parts Configuration</h3>
        {Object.keys(parts).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={parts[key]}
              onChange={handlePartsChange}
              className="p-2 border w-full"
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Labor Configuration</h3>
        {Object.keys(labor).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={labor[key]}
              onChange={handleLaborChange}
              className="p-2 border w-full"
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Total Estimate</h3>
        <input
          type="text"
          value={totalEstimate}
          readOnly
          className="p-2 border w-full"
        />
      </div>
      <button onClick={handleSaveEstimate} className="bg-blue-500 text-white p-2">Save Estimate</button>
    </div>
  );
};

export default EstimateBuilder;