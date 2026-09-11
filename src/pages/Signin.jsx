import React,{ useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginState } from '../redux/authSlice';
const Signin = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[usernameErr,setusernameErr]=useState("");
  const[pwdErr,setpwdErr]=useState("");
  const API="http://localhost:3000/users";
  const navigate = useNavigate();
  const dispatch=useDispatch();
  async function handleSignin(e)
   {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    if(emailRegex.test(username))
    {
      try{
      const user=await fetch(`${API}?email=${encodeURIComponent(username)}`).then(response=>response.json());
      console.log(user);
      if(user[0])
      {
        setusernameErr("User Exists");
      }
      else{
        setusernameErr("User doesnt Exists");
        return;
      }
      if(user[0].password===password)
      {
         
        setpwdErr("");
        console.log("user signed in succcessfully");
        console.log("USER FROM API:", user);


      dispatch(loginState(user));
      console.log("LOGIN DISPATCHED");
      navigate("/taskmanager");
      }
      else{
        setpwdErr("Password Mismatch");
        return;
      }
    }
    catch(err)
    {
      console.log(err);
    }
    }
   
    
  };
  return (
  
      <main className="min-h-screen w-full bg-gradient-to-b from-purple-200 via-indigo-100 to-white flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* Main container */}
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {/* Logo & Heading */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <img
            src="/icons/logo.png"
            alt="Task Bloom"
            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto mx-auto mb-4 sm:mb-5" />

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-900">
           🌸 Welcome Back 🌸
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-purple-600 mt-2">
            Let's continue blooming today
          </p>

        </div>

        {/* Sign In Card */}
        <div className="w-full bg-white/50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 md:p-8 lg:p-10">

          <form onSubmit={handleSignin}>

            {/* Email / Phone */}
            <div>
              <label htmlFor="username" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Email or Phone Number
              </label>

              <input id="username" type="email" value={username} onChange={(e) => 
              { setUsername(e.target.value)
                if(!emailRegex.test(e.target.value))
                  {
                    setusernameErr("Invalid Username format")
                    return;
                  }
                  else{
                    setusernameErr("")
                  }
                 
                }}
                placeholder="Enter your email" required
                className="w-full mb-1 px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl
                  border border-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400
                  focus:border-transparent transition"/>
                  {usernameErr && ( <small className="text-xs text-blue-500 mt-1 mb-4 px-2">{usernameErr}</small>)}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Password
              </label>

              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" required
                className=" w-full mb-1 px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border border-purple-200
                  bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              />
              {pwdErr && ( <small className="text-xs text-blue-500 mt-1 mb-4 px-2">{pwdErr}</small>)}
            </div>

            {/* Sign In Button */}
            <button type="submit" className="
                w-full py-3 sm:py-3.5 px-4 mt-2 text-sm sm:text-base font-semibold text-white bg-purple-500 hover:bg-purple-600 
                active:bg-purple-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >Sign In
            </button>
          </form>

          {/* Sign Up */}
          <div className="text-center mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-purple-100">

            <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4">
              New to Task Bloom?{" "}
            <Link to="/signup" className=" text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                Sign up here
              </Link>
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4">
              Forgot Your Password?{" "}
            <Link to="/forgot-password" className=" text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                Reset here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs sm:text-sm text-purple-400 mt-5 sm:mt-6">
          Bloom every day. One small step at a time. 🌱
        </p>

      </div>
    </main>
   
  );
}

export default Signin;


