import React, { useEffect, useState } from 'react';
import app from '../firebase'; // Import Firebase instance

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const email = user.email;
        const nameFromEmail = email?.split('@')[0]; // Generate name based on the email prefix
        setUserName(nameFromEmail);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>Name: {userName}</p>
          <p>Other information: {/* Add additional info here */}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileComponent;
