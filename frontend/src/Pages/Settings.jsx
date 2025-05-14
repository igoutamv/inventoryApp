import { useEffect, useState } from "react";
import Aside from "../Components/Aside"
import Navbar from '../Components/Navbar'

const Settings = () => {

  useEffect(() => {
    document.title = "IMS - Settings";
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white p-1">
    {/* Navbar - Red */}
 <div className="h-16 w-full  flex items-center justify-center" >
   <Navbar/>
 </div>


     {/* Content Area */}
     <div className="flex flex-1 w-full gap-2">

     {/* Aside - Blue */}
     <div className="w-48 flex  justify-center">
     <Aside/>
     </div>


     {/* Dashboard main items */}
      <div className="w-[100%] bg-[#F2F3F5] border border-[#9E9E9E] rounded-md flex flex-col  shadow p-6 ">
        <h1 className="text-2xl font-bold mb-4">Profile & Settings </h1>
        {/* Profile Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" className="p-2 border rounded-lg" />
            <input type="email" placeholder="Email" className="p-2 border rounded-lg" />
          </div>
        </div>

        

      </div>

    </div>
   


</div>

  )
}

export default Settings
