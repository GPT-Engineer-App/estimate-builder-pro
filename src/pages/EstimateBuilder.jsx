import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerDemo } from "@/components/ui/date-picker";
import ReactToPrint from 'react-to-print';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, Printer } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { fetchPreConfiguredJobs } from '../api/preConfiguredJobs.js';

const advisors = ["Mark W.", "Alicia E.", "Katrina B.", "Josh B.", "Rick S."];
const paymentTypes = ["Customer", "Dealership", "Warranty", "Ext Warranty", "Insurance"];
const deductibleAmounts = ["200", "250", "500", "750", "1000", "1500"];

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
    date: '', // Add date field
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
  });
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [partsTotal, setPartsTotal] = useState(0);
  const [laborTotal, setLaborTotal] = useState(0);
  const [shopSupplies, setShopSupplies] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const estimateRef = useRef();

  useEffect(() => {
    fetchJobCodes(); // Fetch job codes when component mounts
  }, []);

  const fetchJobCodes = async () => {
    try {
      const data = await fetchPreConfiguredJobs();
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

  const handleAdvisorChange = (value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      advisor: value,
    }));
  };

  const handlePaymentTypeChange = (value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      paymentType: value,
    }));
  };

  const handleDeductibleChange = (value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      deductible: value,
    }));
  };

  const handleDateChange = (date) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      date: date,
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
    if (name === 'hrs' || name === 'laborHr') {
      calculateLaborCost({ ...labor, [name]: value });
    }
  };

  const calculateLaborCost = (updatedLabor) => {
    const laborCost = parseFloat(updatedLabor.hrs || 0) * parseFloat(updatedLabor.laborHr || 0);
    setLabor((prevLabor) => ({
      ...prevLabor,
      labor: laborCost.toFixed(2),
    }));
  };

  const handleSaveEstimate = async () => {
    // Validate input fields
    if (!customer.firstName || !customer.lastName || !customer.phoneNumber || !customer.unitDescription || !customer.vin || !customer.advisor || !customer.paymentType || !customer.date) {
      toast.error("Please fill in all required customer information.");
      return;
    }

    if (Object.values(parts).some(part => !part) || Object.values(labor).some(lab => !lab)) {
      toast.error("Please fill in all parts and labor details.");
      return;
    }

    if (customer.paymentType === "Insurance" && !customer.deductible) {
      toast.error("Please select a deductible amount before saving the estimate.");
      return;
    }

    // Generate unique identifier
    const estimateId = uuidv4();

    // Store estimate data
    const estimateData = {
      estimateNumber: estimateId,
      customerId: customer.id, // Assuming customer ID is available in the customer object
      jobCode,
      partsConfiguration: parts,
      laborConfiguration: labor,
      totalEstimate,
    };

    setIsSaving(true);

    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estimateData),
      });

      if (!response.ok) {
        throw new Error('Failed to save estimate');
      }

      // Display confirmation message
      toast.success(`Estimate saved successfully! Estimate ID: ${estimateId}`);

      // Update user interface
      setIsSaving(false);
    } catch (error) {
      // Handle errors
      toast.error(`Error saving estimate: ${error.message}`);
      setIsSaving(false);
    }
  };

  const calculateTax = () => {
    const partsTotal = Object.values(parts).reduce((acc, part) => acc + parseFloat(part || 0), 0);
    const shopSupplies = partsTotal * 0.07;
    return (partsTotal + shopSupplies) * 0.0825;
  };

  const calculateLabor = () => {
    return parseFloat(labor.hrs || 0) * parseFloat(labor.laborHr || 0);
  };

  const calculateLaborTotal = () => {
    return calculateLabor() + parseFloat(labor.sublet || 0);
  };

  const calculateEstimateTotal = () => {
    const partsTotal = Object.values(parts).reduce((acc, part) => acc + parseFloat(part || 0), 0);
    const laborTotal = calculateLaborTotal();
    const shopSupplies = partsTotal * 0.07;
    const tax = calculateTax();
    const deductible = parseFloat(customer.deductible || 0);
    return partsTotal + parseFloat(parts.extras || 0) + shopSupplies + laborTotal + tax - deductible;
  };

  useEffect(() => {
    // Calculate parts total
    const partsTotal = Object.values(parts).reduce((acc, part) => acc + parseFloat(part || 0), 0);
    setPartsTotal(partsTotal);

    // Calculate labor total
    const laborTotal = calculateLaborTotal();
    setLaborTotal(laborTotal);

    // Calculate total estimate
    const totalEstimate = calculateEstimateTotal();
    setTotalEstimate(totalEstimate);
  }, [parts, labor, customer.deductible]);

  useEffect(() => {
    const partsTotal = Object.values(parts).reduce((acc, part) => acc + parseFloat(part || 0), 0);
    setShopSupplies(partsTotal * 0.07);
  }, [parts]);

  return (
    <div className="p-4" ref={estimateRef}>
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
            {key === 'advisor' ? (
              <Select onValueChange={handleAdvisorChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select advisor" />
                </SelectTrigger>
                <SelectContent>
                  {advisors.map((advisor) => (
                    <SelectItem key={advisor} value={advisor}>
                      {advisor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : key === 'paymentType' ? (
              <Select onValueChange={handlePaymentTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : key === 'deductible' ? (
              <Select onValueChange={handleDeductibleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select deductible amount" />
                </SelectTrigger>
                <SelectContent>
                  {deductibleAmounts.map((amount) => (
                    <SelectItem key={amount} value={amount}>
                      ${amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : key === 'date' ? (
              <DatePickerDemo selectedDate={customer.date} onDateChange={handleDateChange} />
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={customer[key]}
                onChange={handleCustomerChange}
                className="p-2 border w-full"
              />
            )}
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
        <h3 className="text-xl mb-2">Parts Total</h3>
        <input
          type="text"
          value={partsTotal}
          readOnly
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Labor Total</h3>
        <input
          type="text"
          value={laborTotal}
          readOnly
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Shop Supplies</h3>
        <input
          type="text"
          value={shopSupplies.toFixed(2)}
          readOnly
          className="p-2 border w-full"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl mb-2">Tax</h3>
        <input
          type="text"
          value={calculateTax().toFixed(2)}
          readOnly
          className="p-2 border w-full"
        />
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
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSaveEstimate}
          className={`flex items-center ${isSaving ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200`}
          disabled={isSaving}
        >
          <Save className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Estimate'}
        </button>
        <ReactToPrint
          trigger={() => (
            <button className="flex items-center bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200">
              <Printer className="mr-2" />
              Print Estimate
            </button>
          )}
          content={() => estimateRef.current}
        />
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .flex {
            flex-direction: column;
            align-items: stretch;
          }
          .space-x-4 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EstimateBuilder;