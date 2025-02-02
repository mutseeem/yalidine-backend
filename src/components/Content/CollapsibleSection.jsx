import React, { useState } from 'react';
import styles from './CollapsibleSection.module.css';

// this code is for collapsible component functionality 

export default function CollapsibleSection({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }; 

  return (
    <div className={styles.section}>
      <div className={styles.header} onClick={toggleCollapse}> 
        <h2>{title}</h2>
        <button className={styles.collapseButton}>
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {!isCollapsed && <div className={styles.content}>{children}</div>}
    </div>
  );
}