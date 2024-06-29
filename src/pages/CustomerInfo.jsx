import React, { useState } from 'react';
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const advisors = ["Mark W.", "Alicia E.", "Katrina B.", "Josh B.", "Rick S."];
const paymentTypes = ["Customer", "Dealership", "Warranty", "Ext Warranty", "Insurance"];
const deductibleAmounts = ["200", "250", "500", "750", "1000", "1500"];

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
  });

  const handleChange = (event) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save customer information logic here
    console.log('Customer Information:', customer);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Customer Information</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(customer).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
            {key === 'date' ? (
              <DatePickerDemo selectedDate={customer.date} onDateChange={handleDateChange} />
            ) : key === 'advisor' ? (
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
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={customer[key]}
                onChange={handleChange}
                className="p-2 border w-full"
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2">Save</button>
      </form>
    </div>
  );
};

export default CustomerInfo;