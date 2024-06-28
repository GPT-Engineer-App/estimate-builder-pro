import React, { useState } from 'react';
import { DatePickerDemo } from "@/components/ui/date-picker";

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