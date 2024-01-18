import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './setup/Login';
import Register from './setup/Register';
import DesiredMod from './pages/desired_mod';
import Matches from './pages/Matches';
import Timeslot from './pages/Timeslot'; // Import Matches component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate replace to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/desired-mod" element={<DesiredMod />} />
          <Route path="/matches" element={<Matches />} /> {/* New route for Matches */}
          <Route path="/timeslot" element={<Timeslot />} /> {/* New route for Timeslot */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
