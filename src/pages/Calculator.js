import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calculator.css';  // Import the CSS for Calculator

function Calculator() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calculatorForm"> 
      <h1>Pick a Date</h1>
      <DatePicker 
        selected={selectedDate} 
        onChange={date => setSelectedDate(date)}
        className="customDatePickerWidth" 
      />
    </div>
  );
}

export default Calculator;
