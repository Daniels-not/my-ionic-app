import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import Firebase authentication
import JsBarcode from 'jsbarcode'; // Import JsBarcode for barcode generation

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null); // Added userData to store user information
  const auth = getAuth(); // Firebase auth instance

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const email = user.email;
        const nameFromEmail = email?.split('@')[0]; // Generate name based on the email prefix
        setUserName(nameFromEmail);

        // For example, setting a barcode from user UID or any unique identifier
        setUserData({
          barcode: user.uid, // Using UID as the barcode value (you can change this logic)
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="p-4 h-full">
      <section className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold text-left">
            Perfil de, {user?.displayName || userName}!
          </h2>
          <small className="text-md text-[#15800e]/80 font-semibold">
            Cuenta básica
          </small>
        </div>
      </section>

      {user ? (
        <section className="w-full h-[90%] flex flex-row gap-5">

          <div className=" flex flex-col items-center w-1/4 h-full justify-center items-center gap-5">
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-4" />

            <section className="w-full">
              <small className="text-md text-[#15800e]/80 font-semibold">
                Correo:
              </small>
              <h2 className="text-xl font-bold text-left ">
                 {user.email}
              </h2>
            </section>

            <section className="w-full">
              <small className="text-md text-[#15800e]/80 font-semibold">
                Nombre de usuario:
              </small>
              <h2 className="text-xl font-bold text-left">
                 {userName}
              </h2>
            </section>

            {/* Barcode Generation Section */}
            {userData?.barcode && (
              <div className="flex justify-center items-center h-full w-full mt-5">
                <svg
                  id="barcode"
                  ref={(node) => {
                    if (node) {
                      JsBarcode(node, userData.barcode, {
                        format: 'CODE128',
                        displayValue: true,
                        fontSize: 18,
                        height: 50,
                      });
                    }
                  }}
                  style={{ width: 'auto', height: 'auto' }} // Optional styling for centering
                ></svg>
              </div>
            )}
          </div>
          <div className="w-full sm:w-3/4 flex flex-col justify-center items-center bg-[#15800e] rounded p-6 mt-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-semibold text-center">
              Todavía no está terminado... muy pronto
            </h1>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileComponent;
