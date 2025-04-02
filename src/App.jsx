import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/layout/NavBar/NavBar";
import Sidebar from "./components/layout/SideBar/SideBar";
import Overview from "./components/Content/overview";
import Content from "./components/Content/Content";
import "./App.css";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Router>
      <div className="app">
      <NavBar isExpanded={isExpanded} />
        <div className="app-body">
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className={`main-content ${isExpanded ? "expanded" : ""}`}>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/overview" element={<Overview />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;