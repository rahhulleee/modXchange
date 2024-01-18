import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Timeslot() {
  const [timeslots, setTimeslots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModuleCodeAndData = async () => {
      if (!auth.currentUser) {
        console.error('User not logged in');
        return;
      }

      // Fetch the user's desired module from Firestore
      const userDocRef = doc(db, 'Users', auth.currentUser.email);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.error('User document does not exist');
        return;
      }

      const moduleCode = userDoc.data().desired_mod;
      // Fetch timeslot data from NUSMods API
      try {
        const response = await fetch(`https://api.nusmods.com/v2/2023-2024/modules/${moduleCode}.json`);
        const data = await response.json();
        setTimeslots(data.timetable);
      } catch (error) {
        console.error('Error fetching timeslots:', error);
        console.log("hello");
      }

      setLoading(false);
    };

    fetchModuleCodeAndData();
  }, []);

  if (loading) {
    return <p>Loading timeslots...</p>;
  }

  return (
    <div>
      <h1>Timeslots</h1>
      <ul>
        {timeslots.map((timeslot, index) => (
          <li key={index}>
            {timeslot.lessonType} - {timeslot.day} {timeslot.startTime} to {timeslot.endTime} at {timeslot.venue}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Timeslot;
