
import { useState } from 'react';
import styles from './NavBar.module.css';
import AppIcon from '../../assets/icons/apps.svg'; // Import as a regular image

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
        <img src={AppIcon} alt="App Icon" className={styles.appIcon} />
        <span className={styles.champsText}>Champs C1 | Politique D'ouverture International</span>
      </div>
      <div className={styles.navbarRight}>
        
       
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
/*{           <span className={styles.itemName}>Overview</span> <input 
          type="text"
          placeholder="Search..."
          className={styles.searchBar}
          value={searchQuery} // Bind the input value to the state
          onChange={handleSearch} // Handle input changes
           <div className={styles.menuIcon} onClick={toggleMenu}>
          ☰ 
        </div>
        />*/
    