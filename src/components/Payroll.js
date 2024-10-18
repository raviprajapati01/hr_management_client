import React, { useState } from 'react';
import axios from 'axios';

const Payroll = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [message, setMessage] = useState('');

  const handleGeneratePayroll = async () => {
    try {
      await axios.post('/payroll/generate', { employeeId, overtimeHours });
      setMessage('Payroll generated successfully!');
    } catch (error) {
      setMessage('Error generating payroll.');
    }
  };

  return (
    <div>
      <h2>Payroll Processing</h2>
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        placeholder="Enter Employee ID"
      />
      <input
        type="number"
        value={overtimeHours}
        onChange={(e) => setOvertimeHours(e.target.value)}
        placeholder="Overtime Hours"
      />
      <button onClick={handleGeneratePayroll}>Generate Payroll</button>
      <p>{message}</p>
    </div>
  );
};

export default Payroll;
