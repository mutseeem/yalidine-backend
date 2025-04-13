import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/layout/NavBar/NavBar';
import Sidebar from '../../components/layout/SideBar/SideBar';
import './ChapterHomeLayout.css';

function ChapterHomeLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="app">
      <NavBar isExpanded={isExpanded} />
      <div className="app-body">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <div className={`main-content ${isExpanded ? "expanded" : ""}`}>
          <Outlet /> {/* This renders the matched child route */}
        </div>
      </div>
    </div>
  );
}

export default ChapterHomeLayout;