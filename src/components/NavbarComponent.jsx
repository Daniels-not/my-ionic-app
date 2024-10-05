import React from 'react'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <nav className="rounded-full bg-white/95 fixed top-4 w-[98%] h-12 left-[1%] z-50 flex items-center justify-center overflow-hidden">
        
        <div className="w-1/3 flex items-center justify-start gap-3 ml-4">
            <Link to="/downloads" className="text-gray-500/50 font-bold hover:text-[#15800e] hover:scale-110 transition-all duration-300">Downloads</Link>
            <Link to="/faq" className="text-gray-500/50 font-bold hover:text-[#15800e] hover:scale-110 transition-all duration-300">FAQ</Link>
        </div>

        {/* LOGO */}
        <span className="w-1/3 flex justify-center">
            <Link to="/">
                <img src="/images/logo2.png" alt="logo" className="w-40" />
            </Link>
        </span>

        {/* BUTTON */}
        <div className="w-1/3 flex items-center justify-end gap-3 mr-4">
            <Link to="/login" className="rounded-full bg-[#15800e] px-4 py-1 font-bold text-white">Log In</Link>
            <Link to="/signup" className="rounded-full border-2 border-[#15800e] px-4 py-1 font-bold text-[#15800e]">Sign Up</Link>
        </div>

    </nav>
  )
}

export default NavbarComponent