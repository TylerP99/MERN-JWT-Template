import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

import ProtectedResource from "./pages/ProtectedResource";
import Login from './pages/Login';
import Register from './pages/Register';

import Navigation from './components/Navigation';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Routes>

          <Route path='/' element={<ProtectedResource/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;