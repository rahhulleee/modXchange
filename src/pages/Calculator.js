import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calculator.css'; // Make sure this file includes your styles

function Calculator() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState(''); // State to keep track of the amount entered

  return (
    <div className="calculatorForm">
      <h1>Pick a Date</h1>
      <DatePicker 
        selected={selectedDate} 
        onChange={date => setSelectedDate(date)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="amountInput"
      />
      <div className="buttonContainer">
        <button onClick={() => console.log('Add amount')}>+</button>
        <button onClick={() => console.log('Subtract amount')}>-</button>
      </div>
    </div>
  );
}

export default Calculator;

