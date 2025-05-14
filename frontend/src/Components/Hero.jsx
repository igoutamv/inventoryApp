import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative min-h-screen  flex flex-col" id="home">
      {/* Fixed Navigation Bar */}
      <nav className="mx-auto fixed top-0 left-0 w-full z-20 backdrop-blur-md bg-white/60 border-b border-gray-200 flex items-center justify-between px-20 py-2
">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img src=".\src\assets\Images\ims.png" alt="IMS Logo" className="h-10" />
          <div>
            <span className="block font-bold text-2xl  text-black">IMS</span>
            <span className="block text-xs text-gray-500">Manage your Items at one place</span>
          </div>
        </div>
        {/* Log In Button */}
            <div>
              <Link
                to="/login"
                className="flex items-center gap-2 border border-gray-400 rounded-full px-5 py-2 text-gray-800 font-medium bg-white/40 hover:bg-white transition-all shadow-sm hover:outline duration-100 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                Log In
              </Link>
            </div>  
      </nav>


      {/* Main Content */}
      <div className="flex  flex-col md:flex-col items-center justify-center max-w-6xl mx-auto w-full pt-32 md:pt-32  relative flex-1 ">
              <div className="bg-yellow-300 flex gap-2 px-4 py-2 justify-center items-center rounded-full font-medium shadow">
                  <div className="bg-slate-500 text-white rounded-full px-2 py-1 text-sm">New</div>
                  Effortless management for your business
              </div>


        {/* Hero Text */}
        <div className="  mt-4">

        <h1 className="text-4xl text-center md:text-6xl font-bold text-gray-900 mb-6 leading-[6rem]">
    Your <span className="text-blue-500">All-In-One</span>  <br /> Inventory Mangament System
  </h1>
  <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed">
  Stay in control of your inventory with real-time tracking and smart stock management.
  </p>



 
 
 
         </div>
        
          {/* Features */}
          <div className="relative overflow-hidden w-full py-4">
  {/* Fade Effects */}
  <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
  <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

  {/* Marquee */}
  <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
    <div className="bg-[#e0f2fe] cursor-pointer text-gray-800 px-6 py-2 rounded-full font-medium shadow hover:bg-[#bae6fd] transition">Manage Inventory</div>
    <div className="bg-[#e0f2fe] cursor-pointer text-gray-800 px-6 py-2 rounded-full font-medium shadow hover:bg-[#bae6fd] transition">Create Bills</div>
    <div className="bg-[#e0f2fe] cursor-pointer text-gray-800 px-6 py-2 rounded-full font-medium shadow hover:bg-[#bae6fd] transition">Record Expense</div>
    <div className="bg-[#e0f2fe] cursor-pointer text-gray-800 px-6 py-2 rounded-full font-medium shadow hover:bg-[#bae6fd] transition">Real-Time Stock Updates</div>
    <div className="bg-[#e0f2fe] cursor-pointer text-gray-800 px-6 py-2 rounded-full font-medium shadow hover:bg-[#bae6fd] transition">Analytics & Reports</div>
  </div>

</div>



        
      </div>
        
    </div>
  );
}

export default Hero;