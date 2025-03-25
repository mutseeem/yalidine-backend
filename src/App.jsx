import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/layout/SideBar/SideBar";
import Overview from "./components/Content/overview";
import Content from "./components/Content/Content";
import "./App.css";

function App() {
  const [isExpanded, setIsExpanded] = useState(false); // Manage sidebar state

  return (
    <Router>
      <div className="app-container">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <div className={`main-content ${isExpanded ? "expanded" : ""}`}>
          <Routes>
            <Route path="/" element={<Content />} /> {/* Default page */}
            <Route path="/overview" element={<Overview />} /> {/* Overview page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
