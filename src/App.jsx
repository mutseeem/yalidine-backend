import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/SideBar';
{/*import NavBar from './components/NavBar/NavBar';*/}
import Overview from './components/Content/overview';
import Content from './components/Content/Content'; // Your existing content page
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        {/*<NavBar /> */}
        <Routes>
          <Route path="/" element={<Content />} /> {/* Default page */}
          <Route path="/overview" element={<Overview />} /> {/* Overview page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;