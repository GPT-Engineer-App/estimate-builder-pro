import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const advisors = ["Advisor 1", "Advisor 2", "Advisor 3"]; // Replace with actual advisor list
const paymentTypes = ["Customer", "Dealership", "Warranty", "Ext Warranty", "Insurance", "Custom"];
const deductibles = ["$200", "$250", "$500", "$750", "$1000", "$1500"];

const CustomerInfo = () => {
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
    totalEstimate: 1000, // Example initial total estimate
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save customer information logic here
    console.log('Customer Information:', customer);
  };

  const calculateTotalEstimate = () => {
    const deductibleAmount = parseInt(customer.deductible.replace('$', '')) || 0;
    return customer.totalEstimate - deductibleAmount;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Customer Information</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(customer).map((key) => (
          key !== 'advisor' && key !== 'paymentType' && key !== 'deductible' && key !== 'totalEstimate' && (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
              <input
                type="text"
                id={key}
                name={key}
                value={customer[key]}
                onChange={handleChange}
                className="p-2 border w-full"
              />
            </div>
          )
        ))}
        <div className="mb-4">
          <label htmlFor="advisor" className="block mb-2">Advisor:</label>
          <Select onValueChange={(value) => handleSelectChange('advisor', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an advisor" />
            </SelectTrigger>
            <SelectContent>
              {advisors.map((advisor) => (
                <SelectItem key={advisor} value={advisor}>{advisor}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="paymentType" className="block mb-2">Payment Type:</label>
          <Select onValueChange={(value) => handleSelectChange('paymentType', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a payment type" />
            </SelectTrigger>
            <SelectContent>
              {paymentTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="deductible" className="block mb-2">Deductible:</label>
          <Select onValueChange={(value) => handleSelectChange('deductible', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a deductible" />
            </SelectTrigger>
            <SelectContent>
              {deductibles.map((amount) => (
                <SelectItem key={amount} value={amount}>{amount}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label htmlFor="totalEstimate" className="block mb-2">Total Estimate:</label>
          <input
            type="text"
            id="totalEstimate"
            name="totalEstimate"
            value={`$${calculateTotalEstimate()}`}
            readOnly
            className="p-2 border w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Save</button>
      </form>
    </div>
  );
};

export default CustomerInfo;