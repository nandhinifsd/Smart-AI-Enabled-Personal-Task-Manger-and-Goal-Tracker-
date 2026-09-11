import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DemoImages = () => {

  const [flipped, setFlipped] = useState(false);
  return (
   <div className="flex justify-center">

      {/* Flip container */}
      <div
        className="w-full max-w-[750px] aspect-[1/1] perspective-[500px]"
        onClick={() => setFlipped(!flipped)}>

        {/* Card */}
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]
            ${flipped ? "rotate-y-180" : ""}`}>

          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden flex items-center justify-center">
            <img
              src="/icons/herobanner.png"
              alt="Task Manager dashboard"
              className="max-w-full max-h-full  rounded-xl shadow-2xl object-contain"
            />
            <Link to="/signin" className="absolute top-[70%] left-[10%] z-100 bg-purple-500 text-[12px] lg:text-sm rounded-3xl shadow-lg text-white px-5 py-2">
            Get Started</Link>
          </div>
            {/* BACK */}
          <div className="
            absolute inset-0 backface-hidden transition-transform duration-700 rotate-y-180 flex items-center justify-center">
            <img
              src="/icons/appdemo.png"
              alt="Task Manager tasks"
              className="max-w-full max-h-full  rounded-xl shadow-2xl object-contain"
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default DemoImages;
