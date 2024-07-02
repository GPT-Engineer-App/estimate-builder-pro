import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { savePreConfiguredJob, fetchPreConfiguredJobs } from '../api/preConfiguredJobs.js';

const JobConfiguration = () => {
  const [jobCode, setJobCode] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobPrice, setJobPrice] = useState('');
  const [roofKit, setRoofKit] = useState('');
  const [roofMembrane, setRoofMembrane] = useState('');
  const [slfLvlDicor, setSlfLvlDicor] = useState('');
  const [nonLvlDicor, setNonLvlDicor] = useState('');
  const [roofScrews, setRoofScrews] = useState('');
  const [glue, setGlue] = useState('');
  const [additionalParts, setAdditionalParts] = useState('');
  const [repairDescription, setRepairDescription] = useState('');
  const [hrs, setHrs] = useState(''); // New state for Hrs
  const [laborHr, setLaborHr] = useState(''); // New state for Labor Hr
  const [preConfiguredJobs, setPreConfiguredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await fetchPreConfiguredJobs();
        setPreConfiguredJobs(data);
      } catch (error) {
        console.error('Error fetching pre-configured jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSaveJob = async (event) => {
    event.preventDefault();

    // Validate numeric fields
    if (isNaN(hrs) || isNaN(laborHr)) {
      alert('Please enter valid numeric values for Hrs and Labor Hr.');
      return;
    }

    const job = {
      job_code: jobCode,
      job_name: jobName,
      job_description: jobDescription,
      job_price: parseFloat(jobPrice),
      roof_kit: parseFloat(roofKit),
      roof_membrane: parseFloat(roofMembrane),
      slf_lvl_dicor: parseFloat(slfLvlDicor),
      non_lvl_dicor: parseFloat(nonLvlDicor),
      roof_screws: parseFloat(roofScrews),
      glue: parseFloat(glue),
      additional_parts: parseFloat(additionalParts),
      repair_description: repairDescription,
      hrs: parseFloat(hrs), // Include Hrs in the payload
      labor_hr: parseFloat(laborHr) // Include Labor Hr in the payload
    };

    try {
      const response = await fetch('https://<your-project-id>.supabase.co/rest/v1/rpc/create_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        throw new Error('Failed to save job');
      }

      const data = await response.json();
      console.log('Job saved successfully:', data);
      alert('Job saved successfully!');
    } catch (error) {
      console.error('Error saving job:', error);
    }

    // Clear the form
    setJobCode('');
    setJobName('');
    setJobDescription('');
    setJobPrice('');
    setRoofKit('');
    setRoofMembrane('');
    setSlfLvlDicor('');
    setNonLvlDicor('');
    setRoofScrews('');
    setGlue('');
    setAdditionalParts('');
    setRepairDescription('');
    setHrs(''); // Clear Hrs field
    setLaborHr(''); // Clear Labor Hr field
  };

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
      <form id="job-config-form" onSubmit={handleSaveJob}>
        <div className="mb-4">
          <select id="job-code-dropdown" value={jobCode} onChange={(e) => setJobCode(e.target.value)} className="mb-4 p-2 border w-full">
            <option value="">Select a job</option>
            {preConfiguredJobs.map((job) => (
              <option key={job.job_code} value={job.job_code}>{job.job_name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="job-name"
            placeholder="Job Name"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            id="job-description"
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="job-price"
            placeholder="Job Price"
            value={jobPrice}
            onChange={(e) => setJobPrice(e.target.value)}
            step="0.01"
            required
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="roof-kit"
            placeholder="Roof Kit"
            value={roofKit}
            onChange={(e) => setRoofKit(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="roof-membrane"
            placeholder="Roof Membrane"
            value={roofMembrane}
            onChange={(e) => setRoofMembrane(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="slf-lvl-dicor"
            placeholder="SLF Lvl Dicor"
            value={slfLvlDicor}
            onChange={(e) => setSlfLvlDicor(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="non-lvl-dicor"
            placeholder="Non Lvl Dicor"
            value={nonLvlDicor}
            onChange={(e) => setNonLvlDicor(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="roof-screws"
            placeholder="Roof Screws"
            value={roofScrews}
            onChange={(e) => setRoofScrews(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="glue"
            placeholder="Glue"
            value={glue}
            onChange={(e) => setGlue(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="additional-parts"
            placeholder="Additional Parts"
            value={additionalParts}
            onChange={(e) => setAdditionalParts(e.target.value)}
            step="0.01"
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            id="repair-description"
            placeholder="Repair Description"
            value={repairDescription}
            onChange={(e) => setRepairDescription(e.target.value)}
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="hrs"
            placeholder="Hrs"
            value={hrs}
            onChange={(e) => setHrs(e.target.value)}
            step="0.01"
            required
            className="p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="labor-hr"
            placeholder="Labor Hr"
            value={laborHr}
            onChange={(e) => setLaborHr(e.target.value)}
            step="0.01"
            required
            className="p-2 border w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Save Job</button>
      </form>
    </div>
  );
};

export default JobConfiguration;