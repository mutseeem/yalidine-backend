import { useState } from 'react';
import styles from './Navbar.module.css';

      // this code here is what makes and handles the navigation bar also very minimal due to it just being a prototype

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query state
    // Add search logic here (e.g., filter items, call an API, etc.)
    console.log('Search Query:', e.target.value); // Log the search query for now
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <span className={styles.champsText}>Champs C1 | Politique D'ouverture International</span>
      </div>
      <div className={styles.navbarRight}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchBar}
          value={searchQuery} // Bind the input value to the state
          onChange={handleSearch} // Handle input changes
        />
        <div className={styles.menuIcon} onClick={toggleMenu}>
          ☰ {/* Hamburger icon */}
        </div>
      </div>
      {isMenuOpen && ( // Conditionally render the menu items
        <div className={styles.menuItems}>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      )}
    </div>
  );
}