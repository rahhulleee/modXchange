import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calculator.css'; // Ensure you have styles set up for this component
import { db } from '../firebase-config'; // Ensure the path to your Firebase config is correct
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '../user/UserContext'; // Adjust the import path as necessary

function Calculator() {
  const user = useUser(); // Fetch the user from UserContext
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState('');

  // Early return if no user is logged in
  if (!user) {
    return <div>Please log in to use this feature.</div>;
  }

  const handleTransaction = async (modifier) => {
    const dateKey = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const userRef = doc(db, 'Users', user.email); // Reference to the user's document using UID

    const docSnap = await getDoc(userRef);
    const userData = docSnap.exists() ? docSnap.data() : {};
    const currentAmount = userData.dates?.[dateKey]?.cash || 0;
    const updatedAmount = modifier === '+' ? currentAmount + parseFloat(amount) : currentAmount - parseFloat(amount);

    // Update Firestore document
    await updateDoc(userRef, {
      [`dates.${dateKey}.cash`]: updatedAmount
    });
  };

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
        <button onClick={() => handleTransaction('+')}>+</button>
        <button onClick={() => handleTransaction('-')}>-</button>
      </div>
    </div>
  );
}

export default Calculator;
