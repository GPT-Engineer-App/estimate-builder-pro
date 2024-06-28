import React, { useState } from 'react';

const JobConfiguration = () => {
  const [jobCode, setJobCode] = useState('');
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
  const [jobs, setJobs] = useState([]);

  const handleJobCodeChange = (event) => {
    setJobCode(event.target.value);
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

  const handleSaveJob = () => {
    const newJob = { jobCode, parts, labor };
    setJobs((prevJobs) => [...prevJobs, newJob]);
    // Clear the form
    setJobCode('');
    setParts({
      roofKit: '',
      roofMembrane: '',
      slfLvlDicor: '',
      nonLvlDicor: '',
      roofScrews: '',
      glue: '',
      additionalParts: '',
    });
    setLabor({
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
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Job Configuration</h2>
      <div className="mb-4">
        <label htmlFor="jobCode" className="block mb-2">Job Code:</label>
        <input
          type="text"
          id="jobCode"
          name="jobCode"
          value={jobCode}
          onChange={handleJobCodeChange}
          className="p-2 border w-full"
        />
      </div>
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
      <button onClick={handleSaveJob} className="bg-blue-500 text-white p-2">Save Job</button>
      <h3 className="text-xl mt-4 mb-2">Existing Jobs</h3>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Job Code</th>
            <th className="border px-2 py-1">Parts</th>
            <th className="border px-2 py-1">Labor</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{job.jobCode}</td>
              <td className="border px-2 py-1">{JSON.stringify(job.parts)}</td>
              <td className="border px-2 py-1">{JSON.stringify(job.labor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobConfiguration;