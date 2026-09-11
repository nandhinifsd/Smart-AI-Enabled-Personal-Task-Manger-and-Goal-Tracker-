import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import DemoImages from '../components/DemoImages';

const Intro = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const featureArray=[
      {
        title:"Organize Your Day",
        info:"Create Tasks, set Priorities and manage your Day with ease",
        image:"/icons/feature1.png"
      },
      {
        title:"Achieve Your Goals",
        info:"Break big dreams into small steps and track your progress",
        image:"/icons/feature2.png"
      },
        {
          title:"Track Progress",
          info:"See your growth with beautiful insights and streaks",
          image:"/icons/feature3.png"
        },
          {
            title:"Make Time For You",
            info:"Focus on what matters to you and your wellbeing",
            image:"/icons/feature4.png"
          },
           {
            title:"Stay Consistent",
            info:"Smart remainders and gentle nudges keep you on track ",
            image:"/icons/feature5.png"
          },
          {
            title:"Smart Personalised Schedules ",
            info:"Personalised daily schedules curated to complete your tasks and achieve your goals",
            image:"/icons/feature6.png"
          }
        
    ]

  return (
    <div>
      {/**Nav bar */}
      <nav className=" fixed left-0 top-0 z-200 bg-white border-b-[3px] border-zinc-200 w-full h-[15%]  p-2 flex flex-row justify-between">
        <img src="/icons/logo.png" alt="task bloom logo image"  className="lg:w-[300px] lg:h-[120px] w-[150px] h-[80px]p-2"/>
      
        {/* Hamburger button - small & medium screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2"
        >
        <img src="/icons/hamburger.png" alt="hamburger menu" width="30px" height="30px"/>
        </button>
         

        {/* Desktop Navbar */}
        <div className="hidden lg:flex flex-row items-center gap-4">
          <a href="#Home" className="text-zinc-600 p-2">Home</a>
          <a href="#Features" className="text-zinc-600 p-2">Features</a>
          <a href="#HowItWorks" className="text-zinc-600 p-2">How It Works</a>
          <Link to="/signin" className="bg-purple-500 rounded-4xl shadow-lg text-white px-5 py-3">
            Get Started</Link>
        </div>
      </nav>
      {/**Toggle menu */}
       {menuOpen && (<div className=" w-screen flex flex-col p-4 justify-evenly gap-1 links-container fixed top-[12%] z-200 bg-white rounded-lg shadow-lg ">
                <a href="#Home" className="text-zinc-600 m-1" onClick={()=>setMenuOpen(!menuOpen)} >Home</a>
                <a href="" className= "text-zinc-600 m-1" onClick={()=>setMenuOpen(!menuOpen)}>Features</a>
                <a href="" className= "text-zinc-600 m-1" onClick={()=>setMenuOpen(!menuOpen)}>How It Works</a>
               <Link to="/signin" className="w-[150px] bg-purple-500 rounded-4xl shadow-lg text-white p-4" onClick={()=>setMenuOpen(!menuOpen)}>Get Started</Link>
               </div>)}
      <section  className='w-screen min-h-screen h-auto bg-linear-to-b from-purple-300 via-indigo-100 to-white lg:p-8 p-2 '>
      
        {/* Mobile -herosection with flip */}
        <section id="Home" className='mt-32'>
          <div className="lg:p-16"></div>
        <div className="block lg:hidden">
                <DemoImages />
        </div>
        {/**Hero section on lg screens */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-3 relative">
          <div className="relative w-full lg:w-2/3 lg:h-4/5">
        <img src="/icons/herobanner.png" alt="hero-banner image" 
        className=' rounded-lg shadow-xl m-0 lg:m-2 w-full h-full'></img>
          <Link to="/signin" className="absolute top-[80%] left-[10%] z-100 bg-purple-500 rounded-4xl shadow-lg text-white px-5 py-3">
            Get Started</Link>
          </div>  
        
        <div className="lg:perspective-[2000px] perspective-distant flex justify-center">
             <div className="lg:rotate-x-[0deg]
                   lg:rotate-y-[-30deg]
                   lg:transition-transform
                   lg:duration-500
                    lg:hover:rotate-y-[-5deg] m-1 p-2">
            <img
                    src="/icons/appdemo.png"
                    alt="Task Bloom dashboard"
                    className="w-full lg:h-14/15 rounded-xl shadow-2xl"
            />
            </div>

        </div>
        </div>

        </section>
        <section id="Features" className='mt-32'>
          <div className="lg:p-16"></div>
          <h1 className="text-2xl lg:text-5xl text-center text-violet-900 p-8 m-8">Everything You Need to Bloom Everyday</h1>
          <div className="features-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 m-8 flex justify-center">
            
         
            {

              featureArray.map((feature)=>(
                
                <div key={feature.title} className="bg-purple-100 w-full max-w-[400px] aspect-[1/1] flex flex-col justify-center items-center rounded-lg shadow-xl m-4 p-6">
                  <img src={feature.image}  alt={feature.title} className="w-full h-[400px] object-contain transition-transform duration-300 hover:scale-110"></img>
                  <p className="text-md/7 font-medium text-center text-purple-700 mb-4">{feature.info}</p>

                  </div>
                  

              ))
            }

          </div>

        </section>

        <section id="HowItWorks" className='mt-32'>
          <div className="lg:p-16"></div>
           <h1 className="text-2xl lg:text-5xl text-center text-violet-900 p-8 m-8">How this App Works?</h1>
           <p className="text-lg lg:text-xl text-center text-purple-700 p-4 m-4">Turn your everyday tasks into meaningful progress with a simple, personalised flow. Add your tasks, set priorities, and plan your day with ease. Stay focused as you work through your tasks, while smart reminders and personalised schedules help you stay consistent. Track your progress, celebrate your wins, and keep moving toward your goals — one small step at a time. 🌸</p>
          <img src="/icons/flow.png" alt="How the app works flow" className='rounded-lg shadow-xl m-8 lg:m-17 w-[90%]'/>
        </section>

        
        </section> 
        <footer>
          <div className="relative w-screen h-auto">
          <img src="/icons/footer.png" alt="footer image" className='rounded-lg shadow-xl my-8 lg:my-17 w-[100%]'/>
          <Link to="/signin" className="text-[10px] lg:text-sm absolute top-[80%] left-[35%] sm:top-[85%] sm:left-[40%]  md:top-[88%] md:left-[42%] md:text-md z-100 text-purple-500 font-bold lg:bg-purple-500 lg:rounded-4xl lg:shadow-lg lg:text-white px-5 py-3">
            Get Started</Link>
          </div>
          
  <div className="max-w-screen px-4 py-8 bg-white border-t border-purple-100">

    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

      <div className="flex items-center gap-2">
        <span className="text-xl">🌸</span>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-purple-700">
            Task Bloom
          </span>
          . All rights reserved.
        </p>
      </div>

      <div className="flex gap-6 text-sm">
        <a
          href="#"
          className="text-gray-500 hover:text-purple-600 transition"
        >
          Privacy Policy
        </a>

        <a
          href="#"
          className="text-gray-500 hover:text-purple-600 transition"
        >
          Terms of Service
        </a>

        <a
          href="#"
          className="text-gray-500 hover:text-purple-600 transition"
        >
          Contact
        </a>
      </div>

    </div>

    <div className="mt-6 pt-5 border-t border-purple-50 text-center">
      <p className="text-xs text-gray-400">
        Bloom every day. One small step at a time. 🌱
      </p>
    </div>

  </div>

        </footer>
    </div>
  );
}

export default Intro;
