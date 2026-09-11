import React from 'react';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutState } from '../redux/authSlice';
import { ListTodo,Target,Settings,LogOut } from 'lucide-react';



const Navbar = ({sidebar,setSidebar}) => {
  console.log("Navbar rendered");
 const name = useSelector((data) => data.auth.user);
 console.log("Navbar user:",name);

 const [showAddMenu, setShowAddMenu] = useState(false); 
 const [showProfileMenu, setShowProfileMenu] = useState(false); 
 const [showMenu,setShowMenu]=useState(false);
 const navigate = useNavigate();
 const dispatch=useDispatch();

 function handleLogOut()
 {

  dispatch(logoutState());
 // dispatch(clearTodos());
  setShowProfileMenu(false); 
  navigate("/signin"); 
 }



function getGreeting()
{
  const hour=new Date().getHours();
  console.log(hour);
  if((hour>5)&&(hour<12))
    return({greeting:"Good Morning! ",
            quote: "A fresh day, a fresh start. Make today count! 🌸"});
  if((hour>=12)&&(hour<17))
    return({greeting:"Good Afternoon! ",
            quote: "Keep going! Every small step brings you closer to your goals. 🌱"});
  if((hour>=17)&&(hour<21))
    return({greeting:"Good Evening! ",
            quote: "Take a moment to appreciate how far you've come today. ✨"});
  if((hour>=21)||(hour<=5))
    return ({
    greeting: "Good Night ",
    quote: "Rest, recharge, and get ready to bloom again tomorrow. 🌙"
  });

}

  return (
    <>
    <nav className="w-[100%] lg:w-[75%] h-auto max-h-[20%] lg:h-[15%] flex flex-row items-center bg-gradient-to-r from-white to-pink-50 
    border-b-4 border-pink-100 fixed top-0 left-0 lg:left-[25%]  z-550 shadow-lg">
      <button
          onClick={() => setSidebar(!sidebar)}
          className="lg:hidden p-2 my-2"
        >
        <img src="/icons/hamburger.png" alt="hamburger menu"  className="transition-transform hover:scale-110 w-[50px] h-[50px] 
           sm:w-[65px] sm:h-[65px]md:w-[80px] md:h-[80px] p-4 "/>
        </button>
      <div className="title-container m-2 px-2 py-4 flex-1 flex-row">
        <h1 className="text-purple-900 font-bold px-2 my-1 text-xl lg:text-3xl">{getGreeting().greeting+name?.[0]?.firstname}</h1>
        <p className="text-purple-500 font-light px-2 my-1 text-xs lg:text-sm">{getGreeting().quote}</p>
      </div>
      <div className="hidden lg:flex flex-row button-container ml-auto  px-6 gap-4 items-center">
        <button className="hidden lg:block" onClick={()=>{setShowAddMenu(!showAddMenu)
                                                          setShowProfileMenu(false)
        }}><img src="/icons/addbtn.png" alt="add-button" 
        width="100px" height="100px" className=" transition-transform hover:scale-110  p-0"/>
         </button>
         
         <button className="hidden lg:block" onClick={()=>{setShowProfileMenu(!showProfileMenu)
                                                           setShowAddMenu(false) }}>
          <img src="/icons/profileimg.png" alt="profile-button" 
          width="80px" height="80px" className="rounded-full transition-transform hover:scale-110  p-0 "/>
         </button>
         
      
      </div>
      <button className=" block lg:hidden" onClick={()=>{setShowMenu(!showMenu)}} ><img src="/icons/down.png" alt="down-button" 
           className="rounded-full transition-transform hover:scale-110 w-[50px] h-[50px] 
           sm:w-[65px] sm:h-[65px]md:w-[80px] md:h-[80px] p-4 "/>
         </button>
      
    </nav>
    <div className="relatives">
   {showAddMenu && ( 
    <div className="hidden lg:flex flex-col fixed top-[20%] right-[5%] sm:top-[15%] mt-2 z-1000 
    rounded-lg bg-white shadow-lg border border-gray-100 py-2"> 
   <Link to="/taskmanager/todays-plan" onClick={() => {setShowAddMenu(false)}} 
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <ListTodo size={18} /> Add New Task </Link> 
   <Link to="/taskmanager/set-goal" onClick={() => {setShowAddMenu(false)} }
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <Target size={18} /> Set New Goal </Link> 
   </div> )}
  

   {showProfileMenu && ( 
    <div className="hidden lg:flex flex-col fixed top-[20%] sm:top-[15%] right-0 mt-2 z-1000
     rounded-lg bg-white shadow-lg border border-gray-100 py-2"> 
   <Link to="/viewprofile" onClick={() => {setShowProfileMenu(false)}} 
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <Settings size={18} /> Settings </Link> 
   <button onClick={() => {  handleLogOut();
                            setShowProfileMenu(false)} }
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <LogOut size={18} /> signout </button> 
   </div> )}

   {showMenu && (
     <div className="flex flex-col fixed top-[15%] right-0 mt-2 rounded-lg bg-white 
     shadow-lg border border-gray-100 py-2 z-1000 lg:hidden"> 
    <Link to="/taskmanager/todays-plan" onClick={() => {setShowMenu(false)}} 
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <ListTodo size={18} /> Add New Task </Link> 
   <Link to="/taskmanager/set-goal" onClick={() => {setShowMenu(false)} }
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <Target size={18} /> Set New Goal </Link>
   <Link to="/viewprofile" onClick={() => {setShowMenu(false)}} 
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <Settings size={18} /> Settings </Link> 
   <button onClick={() => {  handleLogOut();
                            setShowMenu(false)} }
   className="flex items-center gap-3 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-blue-700" > 
   <LogOut size={18} /> signout </button> 
   </div> )}

  
   </div>
   </>
  );
}

export default Navbar;
