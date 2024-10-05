import React from 'react'
import { useNavigate } from 'react-router-dom';

const StartSubComponent = () => {
    
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

  return (
    <div className="w-full h-[100vh] relative overflow-hidden">

            <div className="bg-[#95ff8d] w-full h-3/4 skew-y-12 absolute -top-[10rem] left-0 z-0">
            </div>

            {/* IMAGE AND CIRCLE*/}
            <div className="absolute w-[25rem] h-[25rem] rounded-full bg-[#15800e] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <img src="/images/bus.webp" className="scale-150 absolute left-[7.5rem] top-[3.5rem]" />
            </div>

            <section className="absolute top-[26rem] w-2/6 right-[58rem]  text-left z-20">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a Mobilitix</h1>
                <p className="text-md text-gray-700 mb-6">Rastrea tu autobús en tiempo real y planifica tu viaje de manera eficiente.</p>
                <button className="bg-[#15800e] text-white font-bold py-2 px-6 rounded-full hover:bg-[#0f5f0a] transition duration-300">
                    Comenzar
                </button>
            </section>

            <button onClick={handleLoginClick}>Go to Login</button>
        </div>
  )
}

export default StartSubComponent