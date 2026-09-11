import React, { useState} from 'react';

import  Sidebar  from "../components/Sidebar";
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Taskmanager = () => {
  console.log("task manager rendered");
   const [sidebar,setSidebar]=useState(false);
   
  return (
    <>
    <div className="w-[30%]">
    <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
    </div>
    <div className="w-[70%]">
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <Outlet />
     </div>
    </>
  );
}

export default Taskmanager;
