import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/index.js';

const JobConfiguration = () => {
  const [jobCode, setJobCode] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobPrice, setJobPrice] = useState('');
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

  const handleJobNameChange = (event) => {
    setJobName(event.target.value);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleJobPriceChange = (event) => {
    setJobPrice(event.target.value);
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
    const newJob = { jobCode, jobName, jobDescription, jobPrice, parts, labor };
    setJobs((prevJobs) => [...prevJobs, newJob]);
    // Clear the form
    setJobCode('');
    setJobName('');
    setJobDescription('');
    setJobPrice('');
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

  document.getElementById('job-config-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const jobCode = document.getElementById('job-code').value;
    const jobName = document.getElementById('job-name').value;
    const jobDescription = document.getElementById('job-description').value;
    const jobPrice = parseFloat(document.getElementById('job-price').value);
    const roofKit = parseFloat(document.getElementById('roof-kit').value);
    const roofMembrane = parseFloat(document.getElementById('roof-membrane').value);
    const slfLvlDicor = parseFloat(document.getElementById('slf-lvl-dicor').value);
    const nonLvlDicor = parseFloat(document.getElementById('non-lvl-dicor').value);
    const roofScrews = parseFloat(document.getElementById('roof-screws').value);
    const glue = parseFloat(document.getElementById('glue').value);
    const additionalParts = parseFloat(document.getElementById('additional-parts').value);
    const repairDescription = document.getElementById('repair-description').value;

    const { data, error } = await supabase
        .from('pre_configured_jobs')
        .insert([
            {
                job_code: jobCode,
                job_name: jobName,
                job_description: jobDescription,
                job_price: jobPrice,
                roof_kit: roofKit,
                roof_membrane: roofMembrane,
                slf_lvl_dicor: slfLvlDicor,
                non_lvl_dicor: nonLvlDicor,
                roof_screws: roofScrews,
                glue: glue,
                additional_parts: additionalParts,
                repair_description: repairDescription
            }
        ]);

    if (error) {
        console.error('Error saving job:', error);
    } else {
        console.log('Job saved successfully:', data);
        alert('Job saved successfully!');
    }
  });

  return (
    <div className="p-4">
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <div className="font-bold">RV STATION</div>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/estimate-builder">Estimate Form</Link>
        </div>
      </nav>
      <h2 className="text-2xl mb-4">Job Configuration</h2>
      <form id="job-config-form">
        <div className="mb-4">
          <label htmlFor="job-code" className="block mb-2">Job Code:</label>
          <input
            type="text"
            id="job-code"
            name="jobCode"
            value={jobCode}
            onChange={handleJobCodeChange}
            className="p-2 border w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="job-name" className="block mb-2">Job Name:</label>
          <input
            type="text"
            id="job-name"
            name="jobName"
            value={jobName}
            onChange={handleJobNameChange}
            className="p-2 border w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="job-description" className="block mb-2">Job Description:</label>
          <textarea
            id="job-description"
            name="jobDescription"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="job-price" className="block mb-2">Job Price:</label>
          <input
            type="number"
            id="job-price"
            name="jobPrice"
            value={jobPrice}
            onChange={handleJobPriceChange}
            className="p-2 border w-full"
            step="0.01"
            required
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
        <button type="button" onClick={handleSaveJob} className="bg-blue-500 text-white p-2">Save Job</button>
      </form>
      <h3 className="text-xl mt-4 mb-2">Existing Jobs</h3>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Job Code</th>
            <th className="border px-2 py-1">Job Name</th>
            <th className="border px-2 py-1">Job Description</th>
            <th className="border px-2 py-1">Job Price</th>
            <th className="border px-2 py-1">Parts</th>
            <th className="border px-2 py-1">Labor</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{job.jobCode}</td>
              <td className="border px-2 py-1">{job.jobName}</td>
              <td className="border px-2 py-1">{job.jobDescription}</td>
              <td className="border px-2 py-1">{job.jobPrice}</td>
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