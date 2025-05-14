import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#23281e] text-gray-200 pt-10 pb-4 px-6 w-full">
      <div className="   max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-4">
        {/* Logo & Description */}
        <div className="flex-1   flex flex-col items-start min-w-[220px] mb-6 md:mb-0">
          <div className="flex items-center mb-3 gap-2">
            <img src=".\src\assets\Images\ims.png" alt="Logo" className='h-14' />
            <div>
              <span className="block font-bold text-xl text-white leading-tight">Inventory<br/>Management System</span>
            </div>
          </div>
          <p className="text-gray-400 text-base max-w-xs mt-2">
            Advanced Inventory Management System platform for managing products and orders.
          </p>
        </div>

          <div className='md:flex-row sm:flex-col w-1/2 flex'>
                    {/* Quick Links */}
                    <div className="flex-1 mb-6 md:mb-0 ">
                      <h4 className="font-bold text-lg mb-3 text-white">Quick Links</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#home" className="hover:text-white transition">Home</a></li>
                        <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                        <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
                      </ul>
                    </div>

                  
                    {/* Social Links */}
                    <div className="flex-2 min-w-[180px]">
                      <h4 className="font-bold text-lg mb-3 text-white">Connect Social</h4>
                      <ul className="space-y-3 text-gray-400">
                        <li className="flex items-center gap-2">
                          {/* Facebook */}
                          <svg width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                          <span>Facebook</span>
                        </li>
                        <li className="flex items-center gap-2">
                          {/* Twitter */}
                          <svg width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z"/></svg>
                          <span><a href="https://x.com/igoutamv" target="_blank" rel="noopener noreferrer">Twitter</a></span>
                        </li>
                          
                            <li className="flex items-center gap-2">
                              {/* LinkedIn */}
                              <svg width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
                              <span><a href="https://www.linkedin.com/in/igoutamv/" target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
                            </li>
                      </ul>
                    </div>
                    </div>


      </div>
      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-2">
        <span>© 2025 Inventory Management System. All rights reserved.</span>
        <div className="flex gap-6 mt-2 md:mt-0">
  <a
    href="https://github.com/igoutamv"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white transition"
  >
    Designed & Developed by: HOPE
  </a>
</div>

      </div>
    </footer>
  );
}

export default Footer;