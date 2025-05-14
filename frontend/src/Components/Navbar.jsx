import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"; 
import imsLogo from '../assets/Images/ims.png';
import { useAuth } from '../Context/AuthContext';
import { motion } from 'framer-motion';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left Side padding  py-3  cange karke dekhna hai*/ }
        <div className="flex items-center justify-center gap-4">
          <img src={imsLogo} alt="IMS" className="h-10 " />
          <h1 className="text-xl font-bold">Inventory Panel </h1>
        </div>

        {/* Avatar & Dropdown */}
        <div className="relative" ref={dropdownRef}>
        
        <FaUserCircle
          size={40}
          className="text-white cursor-pointer hover:text-gray-200"
          onClick={() => setOpen(!open)}
        />
          {open && (
            <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-48 bg-white rounded-lg shadow-lg py-3 text-m z-50">
              
              <Link to="/settings" className="flex gap-2 block px-4 py-2 hover:bg-gray-100 hover:font-semibold text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

              Profile & Settings</Link>
              <button 
                onClick={handleLogout}
                className="flex gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 hover:font-semibold text-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
