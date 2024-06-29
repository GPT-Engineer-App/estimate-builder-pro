import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerDemo } from "@/components/ui/date-picker";
import ReactToPrint from 'react-to-print';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, Printer } from "lucide-react";

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

  const estimateRef = useRef();

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

  const handleSaveEstimate = () => {
    if (customer.paymentType === "Insurance" && !customer.deductible) {
      alert("Please select a deductible amount before saving the estimate.");
      return;
    }
    // Save estimate logic here
    console.log('Estimate saved:', { customer, jobCode, parts, labor, totalEstimate });
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
          className="flex items-center bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
        >
          <Save className="mr-2" />
          Save Estimate
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