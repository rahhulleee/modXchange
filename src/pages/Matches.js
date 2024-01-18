// Matches.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc here
import { auth } from '../firebase-config';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!auth.currentUser) {
        console.error('User not logged in');
        return;
      }

      const userDocRef = doc(db, 'Users', auth.currentUser.email);
      const userDoc = await getDoc(userDocRef); // getDoc is used to fetch the user's document

      if (!userDoc.exists()) {
        console.error('User document does not exist');
        return;
      }

      const desiredMod = userDoc.data().desired_mod;
      const q = query(collection(db, 'Users'), where('desired_mod', '==', desiredMod));

      const querySnapshot = await getDocs(q);
      const matchEmails = [];
      querySnapshot.forEach((docSnap) => {
        // Exclude the current user from the matches
        if (docSnap.id !== auth.currentUser.email) {
          matchEmails.push(docSnap.id); // Assuming email is the document ID
        }
      });

      setMatches(matchEmails);
      setLoading(false);
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <p>Loading matches...</p>;
  }

  return (
    <div>
      <h2>These are your matches:</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((email) => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
}

export default Matches;
