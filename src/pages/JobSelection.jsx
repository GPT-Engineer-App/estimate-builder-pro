import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const JobSelection = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [jobDetails, setJobDetails] = useState({
    jobName: '',
    parts: '',
    labor: '',
    totalEstimate: '',
  });
  const [jobs, setJobs] = useState([]);

  const handleJobChange = (event) => {
    const { name, value } = event.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
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
        <div className="mb-4">
          <label htmlFor="jobName" className="block mb-2">Job Name:</label>
          <Input
            type="text"
            id="jobName"
            name="jobName"
            value={jobDetails.jobName}
            onChange={handleJobChange}
            className="mb-4 p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="parts" className="block mb-2">Parts:</label>
          <Input
            type="text"
            id="parts"
            name="parts"
            value={jobDetails.parts}
            onChange={handleJobChange}
            className="mb-4 p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="labor" className="block mb-2">Labor:</label>
          <Input
            type="text"
            id="labor"
            name="labor"
            value={jobDetails.labor}
            onChange={handleJobChange}
            className="mb-4 p-2 border w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalEstimate" className="block mb-2">Total Estimate:</label>
          <Input
            type="text"
            id="totalEstimate"
            name="totalEstimate"
            value={jobDetails.totalEstimate}
            onChange={handleJobChange}
            className="mb-4 p-2 border w-full"
          />
        </div>
        <Button onClick={handleSaveJob} className="bg-blue-500 text-white p-2 mt-4">Save Job</Button>
        <div className="mt-8">
          <h3 className="text-xl mb-2">Existing Jobs</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Name</TableHead>
                <TableHead>Parts</TableHead>
                <TableHead>Labor</TableHead>
                <TableHead>Total Estimate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.jobName}</TableCell>
                  <TableCell>{job.parts}</TableCell>
                  <TableCell>{job.labor}</TableCell>
                  <TableCell>{job.totalEstimate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteJob(job.jobName)} className="bg-red-500 text-white p-1 ml-2">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default JobSelection;