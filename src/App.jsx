// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import DataSet from './Components/DataSet';
import UserHome from './Components/UserHome';
import AdminHome from './Components/AdminHome';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dataset" element={<DataSet />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
        </Routes>
      </div>
    </Router>
  );
}
