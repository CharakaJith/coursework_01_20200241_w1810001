import './profileDisplay.css';
import { useState, useEffect } from 'react';

function ProfileDisplay() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userObject = storedUser ? JSON.parse(storedUser) : null;

    setUser(userObject);
  }, []);

  return (
    <div className="profile-display">
      <div className="country-display-header">
        <h1>Profile</h1>
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      </div>

      <div className="profile-separator">
        <div className="profile-left">
          {/* Left side content */}
          <p>Left side content</p>
        </div>
        <div className="profile-right">
          {/* Right side content */}
          <p>Right side content</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDisplay;
