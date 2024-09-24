import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app from '../firebase'; // Ensure this is the correct Firebase import

const DashboardComponent = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const email = user.email;
        const nameFromEmail = email?.split('@')[0];
        setUserName(nameFromEmail);
      }
    });

    const savedFormData = JSON.parse(localStorage.getItem('userFormData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await app.auth().signOut();
      localStorage.removeItem('userFormData'); // Optionally clear saved data
      history.push('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">Welcome to Your Dashboard</h2>
      {user && (
        <>
          <div className="mb-4">
            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600"><strong>Name:</strong> {userName}</p>
          </div>
          {/* <div className="mb-4">
            <p className="text-gray-600"><strong>Career:</strong> {formData?.career}</p>
            <p className="text-gray-600"><strong>Classes:</strong> {formData?.classes?.join(', ')}</p>
            <p className="text-gray-600"><strong>Classification:</strong> {formData?.classification}</p>
            <p className="text-gray-600"><strong>Year:</strong> {formData?.year}</p>
          </div> */}
          <Link to="/profile" className="text-indigo-600 font-medium underline">Go to Profile</Link>
        </>
      )}
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-6 rounded w-full">
        Logout
      </button>
    </div>
  );
};

export default DashboardComponent;
