import React from 'react'

const AboutSubComponent = () => {
  return (
        <div className="w-full h-[100vh] flex justify-evenly items-center overflow-hidden bg-gray-100 gap-4">

            <section className="w-1/2 rounded-md overflow-hidden ml-4 shadow-md">
                <img src="/section_images/bus-stop.jpg" className='w-full' />
            </section>

            <section className="w-1/2 rounded-md overflow-hidden mr-4 flex justify-center items-center flex-col">
                <h1 className="font-bold text-5xl w-5/6">About</h1>
                <p className='text-gray-500/90 mt-5 text-justify w-5/6'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                    mollit anim id est laborum.
                </p>
                <p className='text-gray-500/90 mt-5 text-justify w-5/6'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                    mollit anim id est laborum.
                </p>
            </section>

        </div>
  )
}

export default AboutSubComponent