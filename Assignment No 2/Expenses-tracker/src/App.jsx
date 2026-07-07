import { useState, useEffect } from 'react';
import { storage } from './storage';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="auth-container fade-in"><p>Loading...</p></div>;
  }

  return (
    <div className="App">
      {currentUser ? (
        <Dashboard 
          username={currentUser} 
          onLogout={() => setCurrentUser(null)} 
        />
      ) : (
        <Auth onAuthSuccess={(username) => setCurrentUser(username)} />
      )}
    </div>
  );
}

export default App;
