import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calculator.css';
import { db } from '../firebase-config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '../user/UserContext';
import { toast } from 'react-toastify'; // Import toast

function Calculator() {
  const user = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState('');

  if (!user) {
    return <div>Please log in to use this feature.</div>;
  }

  const handleTransaction = async (modifier) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const userRef = doc(db, 'Users', user.email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const currentAmount = userData.dates?.[dateKey]?.cash || 0;
      const updatedAmount = modifier === '+' ? currentAmount + parseFloat(amount) : currentAmount - parseFloat(amount);

      await updateDoc(userRef, {
        [`dates.${dateKey}.cash`]: updatedAmount
      });

      toast(`Your current savings/spending is: ${updatedAmount}\nFor ${dateKey}`);
    } else {
      await setDoc(userRef, {
        dates: {
          [dateKey]: { cash: modifier === '+' ? parseFloat(amount) : -parseFloat(amount) }
        }
      });

      toast(`A new entry was created with ${modifier === '+' ? parseFloat(amount) : -parseFloat(amount)}\nFor ${dateKey}`);
    }
  };

  return (
    <div className="calculatorForm">
      <h1>Tracker</h1>
      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
      <input type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} className="amountInput" />
      <div className="buttonContainer">
        <button onClick={() => handleTransaction('+')}>+</button>
        <button onClick={() => handleTransaction('-')}>-</button>
      </div>
    </div>
  );
}

export default Calculator;
