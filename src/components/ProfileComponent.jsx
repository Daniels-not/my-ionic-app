import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const auth = getAuth(); // Firebase auth instance

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const email = user.email;
        const nameFromEmail = email?.split('@')[0]; // Generate name based on the email prefix
        setUserName(nameFromEmail);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      {user ? (
        <div className="flex flex-col items-center">
          <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <p>Email: {user.email}</p>
          <p>Name: {userName}</p>
          <p>Other information: {/* Add additional info here */}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileComponent;
