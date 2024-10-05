import React from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import app from '../firebase'; // Ensure this is the correct Firebase configuration import
import HomeIcon from "./icons/HomeIcon";
import LogOutIcon from "./icons/LogOutIcon";
import DashboardHomeSubComponent from "./subcomponents/DashboardHomeSubComponent";
import TripsIcon from "./icons/TripsIcon";

const DashboardComponent = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth); // Use signOut from the Firebase auth module
      localStorage.removeItem('userFormData'); // Optionally clear saved data
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally display an error message to the user
    }
  };


  /* VARS */
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app); // Get the Firebase authentication instance

  const [links, setLinks] = React.useState([
    {title: "Home", icon: <HomeIcon />},
    {title: "Trips", icon: <TripsIcon />},
    {title: "Logout", icon: <LogOutIcon />, func: handleLogout},
  ])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
  }, [auth]);

  return (
    <div className="w-full flex justify-between items-center h-[100vh] bg-gray-100 gap-5">

      <section className="w-1/6 h-[85%] mt-11 ml-4 flex flex-col bg-[#15800e] rounded-md">
        
        <div>
          <img src="/images/logo3.png" />
        </div>

        <div className="w-5/6 flex flex-col gap-5 items-center justify-start mx-auto">
          {
            links?.length !== 0 && (
              links?.map((value, idx) => {
                if(value?.func !== undefined)
                {
                  return <button onClick={() => value?.func()} className="w-full p-2 rounded-md flex justify-start items-center gap-4 text-md font-bold text-white hover:bg-white hover:text-[#15800e] transition-all duration-300">
                    {value?.icon} {value.title}
                  </button>
                }
                else
                {
                  return <button className="w-full p-2 rounded-md flex justify-start items-center gap-4 text-md font-bold text-white hover:bg-white hover:text-[#15800e] transition-all duration-300">
                    {value?.icon} {value.title}
                  </button>
                }
              })
            )
          }
        </div>

      </section>

      <section className="w-5/6 h-[85%] mt-11 mr-4 flex flex-col justify-start bg-white rounded-md">
        <Container page={1} user={user} userName={userName} />
      </section>

    </div>
  );
};

const Container = ({ page=1, user, userName }) => {
  switch(page)
  {
    case 1: 
    {
      return <DashboardHomeSubComponent user={user} userName={userName} />
    }

    default: 
    {
      return <DashboardHomeSubComponent user={user} userName={userName} />
    }
  }
}

{/* <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">Welcome to Your Dashboard</h2>
        {user && (
          <>
            <div className="mb-4">
              <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600"><strong>Name:</strong> {userName}</p>
            </div> */}
            {/* You can uncomment this section when you have the form data */}
            {/* <div className="mb-4">
              <p className="text-gray-600"><strong>Career:</strong> {formData?.career}</p>
              <p className="text-gray-600"><strong>Classes:</strong> {formData?.classes?.join(', ')}</p>
              <p className="text-gray-600"><strong>Classification:</strong> {formData?.classification}</p>
              <p className="text-gray-600"><strong>Year:</strong> {formData?.year}</p>
            </div> */}
            {/* <Link to="/profile" className="text-indigo-600 font-medium underline">Go to Profile</Link>
          </>
        )}
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-6 rounded w-full">
          Logout
        </button> */}

export default DashboardComponent;
