// DesiredMod.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, db } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore';

function DesiredMod() {
  const [desiredMod, setDesiredMod] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        console.error('User not logged in or missing email');
        return;
      }

      const userDocRef = doc(db, 'Users', auth.currentUser.email);
      await setDoc(userDocRef, { desired_mod: desiredMod }, { merge: true });

      navigate('/timeslot'); // Navigate to Matches page after successful submission
    } catch (error) {
      console.error('Error updating desired mod:', error.message);
    }
  };

  return (
    <div className="desired-mod-container">
      <h1>Desired Mod</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Which mod do you want to swap?</label><br />
          <input
            type="text"
            value={desiredMod}
            onChange={(e) => setDesiredMod(e.target.value)}
          />
        </div><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DesiredMod;
