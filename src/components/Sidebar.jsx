import React from 'react';
import { useState,useEffect } from 'react';
import { Link,Outlet,useLocation } from 'react-router-dom';



    const Sidebar = ({sidebar,setSidebar}) => {
    const [isOpen, setIsOpen] = useState(false);

     const menuItems = [
    {
      name: "Dashboard",
      path: "/taskmanager",
      icon: "/icons/dashboard.png"
    },
    {
      name: "My Tasks",
      path: "/taskmanager/todays-plan",
      icon: "/icons/tasks.png"
    },
    {
      name: "My Goals",
      path: "/taskmanager/goals",
      icon: "/icons/goals.png"
    },
    {
      name: "Progress",
      path: "/taskmanager/progress",
      icon: "/icons/progress.png",
    },
  ];


  return (
    <>
    {sidebar && (
     <div  className="w-full sm:w-[50%] md:w-[35%] lg:hidden flex flex-col gap-2  h-screen 
     bg-gradient-to-b from-purple-200 via-indigo-100 to-white border-r-4 border-pink-100 
     fixed top-0 left-0 shadow-lg z-100 px-4 py-2 ">
        
        <button
          onClick={() => setSidebar(!sidebar)}
          className="lg:hidden px-16 py-6 "
        >
        <img src="/icons/hamburger.png" alt="hamburger menu"  className="transition-transform hover:scale-110 w-[30px] h-[30px] 
           sm:w-[45px] sm:h-[45px]md:w-[60px] md:h-[60px] "/>
        </button>
    {
        menuItems.map((item)=>(
          <div key={item.name}> 
        <Link to={item.path} onClick={() => setSidebar(!sidebar)} className="flex flex-row px-10 py-2 m-2 text-purple-700 hover:bg-purple-500
         hover:rounded-xl hover:shadow-xl hover:text-white ">
        <img src={item.icon} alt={item.name}  className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] transition-transform hover:scale-110" />
        <p className='hidden lg:block my-8 px-6 font-bold text-lg'>{item.name}</p></Link>
        </div>
        ))}
        </div>
   ) }
    <div  className="hidden lg:flex w-[25%]  flex-col gap-2  h-screen bg-gradient-to-b from-purple-200 via-indigo-100 to-white border-r-4 border-pink-100 fixed top-0 left-0 shadow-lg z-100 px-4 py-2 ">
        <img src="/icons/logo.png" alt="Logo image" className=" w-full h-[120px] mx-2 p-2" />
        
    {
        menuItems.map((item)=>(
          <div key={item.name}> 
        <Link to={item.path}  className="flex flex-row px-10 py-2 m-2 text-purple-700 hover:bg-purple-500
         hover:rounded-xl hover:shadow-xl hover:text-white ">
        <img src={item.icon} alt={item.name}  className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] transition-transform hover:scale-110" />
        <p className='hidden lg:block my-8 px-6 font-bold text-lg'>{item.name}</p></Link>
        </div>
        
        ))}
     {/* Footer text */}
        <p className="text-center text-xs sm:text-sm text-purple-400 mt-auto">
          Bloom every day. One small step at a time. 🌱
        </p>
         </div>
    
    </>
  );
}

export default Sidebar;


