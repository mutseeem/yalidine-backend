import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null); // the auth context 

const USER_STORAGE_KEY = 'mock_users'; // key to store registered users in localStorage
const CURRENT_USER_KEY = 'mock_current_user'; // key to store the current user

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [authLoading, setAuthLoading] = useState(true); 

  // effect to load user from localStorage on component mount
  useEffect(() => {
    console.log("AuthContext: Effect running for initial load from localStorage.");
    const loadAuthFromStorage = () => {
      try {
        const storedUser = localStorage.getItem(CURRENT_USER_KEY);// we get the user 
        if (storedUser) { // if he is found 
          const user = JSON.parse(storedUser); 
          setCurrentUser(user); 
          setIsLoggedIn(true); 
          console.log("AuthContext: Successfully loaded user from localStorage:", user);
        } else { 
          console.log("AuthContext: No user found in localStorage.");
        }
      } catch (e) { 
        console.error("AuthContext: Error loading or parsing user from localStorage:", e);
        localStorage.removeItem(CURRENT_USER_KEY); 
        setCurrentUser(null); 
        setIsLoggedIn(false); 
      } finally {
        setAuthLoading(false); 
        console.log("AuthContext: Initial auth check complete.");
      }
    };

    loadAuthFromStorage(); // call the loading function
  }, []);

  const login = (username, password) => { 
    const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]'); //get all teh user 
    const user = users.find(u => u.username === username && u.password === password); // find teh matching user

    if (user) { 
      setCurrentUser(user); 
      setIsLoggedIn(true); 
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      console.log(`AuthContext: User ${username} logged in, stored in localStorage.`);
      return true; 
    } else { 
      console.log('AuthContext: Login failed: Invalid credentials.');
      return false; 
    }
  };

  const signup = (username, password, role) => { 
    let users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]'); 
    if (users.some(u => u.username === username)) { 
      console.log('AuthContext: Signup failed: Username already exists.');
      return false; 
    }

    const newUser = { username, password, role }; // create new user object
    users.push(newUser); // add new user to the list
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users)); // save updated user list to localStorage
    console.log(`AuthContext: User ${username} signed up.`);
    return true;
  };

  const logout = () => { 
    setCurrentUser(null); 
    setIsLoggedIn(false); 
    localStorage.removeItem(CURRENT_USER_KEY); 
    console.log('AuthContext: User logged out, data removed from localStorage.');
  };

  const getUserRole = () => currentUser ? currentUser.role : null; 

  return (
    
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, signup, logout, getUserRole, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { // custom hook to consume authentication context
  return useContext(AuthContext); // return the context value
};