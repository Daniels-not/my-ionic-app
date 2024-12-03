import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Firebase authentication

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth(); // Firebase auth instance
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the logged-in user
        console.log(user)
        setIsLoggedIn(true); // Mark user as logged in
      } else {
        setIsLoggedIn(false); // Mark user as not logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // If the user is logged in, hide the navbar
  // if (isLoggedIn) {
  //   return null;
  // }

  return (
    <nav className="rounded-full bg-white/95 fixed top-4 w-[98%] h-12 left-[1%] z-50 flex items-center justify-center overflow-hidden">
      <div className="w-1/3 flex items-center justify-start gap-3 ml-4">
        <button
          onClick={() => navigate('/downloads')}
          className="text-gray-500/50 font-bold hover:text-[#15800e] hover:scale-110 transition-all duration-300"
        >
          Descargas
        </button>
        <button
          onClick={() => navigate('/faq')}
          className="text-gray-500/50 font-bold hover:text-[#15800e] hover:scale-110 transition-all duration-300"
        >
          Preguntas
        </button>
      </div>

      {/* LOGO */}
      <span className="w-1/3 flex justify-center">
        <button onClick={() => navigate('/')}>
          <img src="/images/logo2.png" alt="logo" className="w-40" />
        </button>
      </span>

      {/* BUTTON */}
      <div className="w-1/3 flex items-center justify-end gap-3 mr-4">
        {user && user?.photoURL && isLoggedIn ?

                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                />

         : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="rounded-full bg-[#15800e] px-4 py-1 font-bold text-white"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-full border-2 border-[#15800e] px-4 py-1 font-bold text-[#15800e]"
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
