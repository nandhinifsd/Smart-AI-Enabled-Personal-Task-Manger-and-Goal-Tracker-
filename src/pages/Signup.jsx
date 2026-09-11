import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const API = "https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/users";
  const navigate = useNavigate();
   const [formData, setFormData] = useState({
                                              firstname: "",
                                              lastname: "",
                                              phoneNumber: "",
                                              email: "",
                                              password: "",
                                              confirmPassword: "",
                                              securityQuestion: "",
                                              securityAnswer: ""});

  const [errors, setErrors] = useState({firstnameErr: "",
                                              lastnameErr: "",
                                              phoneNumberErr: "",
                                              emailErr: "",
                                              passwordErr: "",
                                              confirmPasswordErr: "",
                                              securityQuestionErr: "",
                                              securityAnswerErr: ""});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const securityQuestions = [
    
    "What is your favorite color?",
    "What is your childhood nickname?",
    "What is the name of your first pet?",
    "What is your favorite food?",
    "What city were you born in?",
  ]; 

 const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      securityQuestion: "",
      securityAnswer: "",
    });

    setErrors({firstnameErr: "",
              lastnameErr: "",
              phoneNumberErr: "",
              emailErr: "",
              passwordErr: "",
              confirmPasswordErr: "",
              securityQuestionErr: "",
              securityAnswerErr: ""});
  }

  function handleData(object,errobject,char_min_count,char_max_count,value,regex)
  {
     setFormData({...formData,[object]:value})
   
     
    if (!value.trim()) 
                setErrors({[errobject] :`${object.toLowerCase()} is required`});
    else  if ((value.length<char_min_count) || (value.length>char_max_count))
    setErrors({[errobject] :`${object} must have atleast ${char_min_count} and not more than ${char_max_count}`});
    else if(!regex.test(value))
       setErrors({...errors,[errobject] : "Invalid Format"});
    
    else {
    setErrors({[errobject]: ""});
    
  }
}
 function checkErrs()
 {
  if (!formData.firstname.trim()) {
      setErrors({...errors,firstnameErr : "First name is required"});
      return false;
    }

    if (!formData.lastname.trim()) {
       setErrors({...errors,lastnameErr : "Last name is required"});
       return false;
    }

    if ((!formData.phoneNumber.trim())||(!phoneRegex.test(formData.phoneNumber))) 
      {
      setErrors({...errors,phoneNumberErr : "Enter a valid Phone number"});
      return false;
    }

    if ((!formData.email.trim())(!emailRegex.test(formData.email))) {
       setErrors({...errors,emailErr : "Enter a valid Email ID"});
    }

    if (formData.password.length < 8) {
      setErrors({...errors,passwordErr : "Password must be atleast 8 characters"});
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
     setErrors({...errors,confirmPasswordErr : "Passwords don't match"});
     return false;
    }

    if (!formData.securityQuestion) {
      setErrors({...errors,securityQuestionErr : "Kindly select a security question"});
      return false;
    }

    if (!formData.securityAnswer.trim()) {
       setErrors({...errors,securityAnswerErr : "Kindly enter your answer"});
       return false;
    }
    if(formData.firstname && formData.lastname && formData.email &&
       formData.phoneNumber && formData.password && formData.confirmPassword 
      && formData.securityQuestion && formData.securityAnswer)

      return true;
 }


 async function handleSignup(e) {
    e.preventDefault();

  

 if(checkErrs)   
 {
    try {
      // Check whether email already exists
      
      const existingEmail = await 
      fetch(`${API}?email=${encodeURIComponent(formData.email)}`)
                                    .then(response=>response.json());
     

      if (existingEmail.length > 0) {
        setErrors({ emailErr: "Email is already registered" });
        return;
      }

       // Create new user
      const newUser = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      };


        const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      console.log("User registered successfully");

      alert("Account created successfully!");

      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
    }

  }

    }



  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-purple-200 via-indigo-100 to-white flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

      {/* Main Container */}
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">

        {/* Logo & Heading */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">

          <img
            src="/icons/logo.png" alt="Task Bloom"
            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto mx-auto mb-4 sm:mb-5" />

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-900">
            🌸 Create Your Account 🌸
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-purple-600 mt-2">
            Start blooming with Task Bloom
          </p>

        </div>

        {/* Signup Card */}
        <div className="w-full bg-white/50 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 md:p-8 lg:p-10">

          <form onSubmit={handleSignup}>

            {/* First Name */}
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                First Name
              </label>

              <input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={(e)=>handleData("firstname","firstnameErr",4,30,e.target.value,nameRegex)}
                placeholder="Enter your first name"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border border-purple-200 
                bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 
                focus:border-transparent transition" required/>

              {errors.firstnameErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.firstnameErr}
                </small>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2" >
                Last Name
              </label>

              <input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={(e)=>{ handleData("lastname","lastnameErr",4,30,e.target.value,nameRegex)
                }}
                placeholder="Enter your last name"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base 
                rounded-xl border border-purple-200 bg-white 
                focus:outline-none focus:ring-2 focus:ring-purple-400 
                focus:border-transparent transition" required />

              {errors.lastnameErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.lastnameErr}
                </small>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e)=>handleData("phoneNumber","phoneNumberErr",10,10,e.target.value,phoneRegex)}
                placeholder="Enter your phone number"
                maxLength="10"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base 
                rounded-xl border border-purple-200 bg-white 
                focus:outline-none focus:ring-2 focus:ring-purple-400 
                focus:border-transparent transition" required />

              {errors.phoneNumberErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.phoneNumberErr}
                </small>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e)=>handleData("email","emailErr",10,50,e.target.value,emailRegex)}
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base 
                rounded-xl border border-purple-200 bg-white focus:outline-none 
                focus:ring-2 focus:ring-purple-400 focus:border-transparent transition" required />

              {errors.emailErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.emailErr}
                </small>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Create Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e)=>handleData("password","passwordErr",8,20,e.target.value,passwordRegex)}
                placeholder="Create your password"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl 
                border border-purple-200 bg-white focus:outline-none focus:ring-2 
                focus:ring-purple-400 focus:border-transparent transition" required />

              {errors.passwordErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.passwordErr}
                </small>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Re-enter Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e)=>{
                  setFormData({...formData,confirmPassword : e.target.value})
                  if(formData.password!==e.target.value)
                  {
                    setErrors({confirmPasswordErr:"Passwords doesnt match"});
                  }
                  else {
                  setErrors({...errors,confirmPasswordErr: ""});
                      }
                }}
                placeholder="Re-enter your password"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base
                 rounded-xl border border-purple-200 bg-white focus:outline-none 
                 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition" required/>

              {errors.confirmPasswordErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.confirmPasswordErr}
                </small>
              )}
            </div>

            {/* Security Question */}
            <div className="mb-4">
              <label
                htmlFor="securityQuestion"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Security Question
              </label>

              <select
                id="securityQuestion"
                name="securityQuestion"
                value={formData.securityQuestion}
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl 
                border border-purple-200 bg-white focus:outline-none focus:ring-2 
                focus:ring-purple-400 focus:border-transparent transition"
                onChange={(e)=>{
                  setFormData({...formData,securityQuestion : e.target.value});
                  if(formData.securityQuestion=="")
                  {
                    setErrors({securityQuestionErr:"Kindly Select a Security Question"})
                  }
                  else {
                      setErrors({...errors,securityQuestionErr: ""});
                }}}>
                <option value="">Select a security question</option>

                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>

              {errors.securityQuestionErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.securityQuestionErr}
                </small>
              )}
            </div>

            {/* Security Answer */}
            <div className="mb-6">
              <label
                htmlFor="securityAnswer"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Security Answer
              </label>

              <input
                id="securityAnswer"
                name="securityAnswer"
                type="text"
                value={formData.securityAnswer}
                onChange={(e)=>{
                  setFormData({...formData,securityAnswer:e.target.value});
                  if(!formData.securityAnswer)
                    setErrors({securityAnswerErr:"Update a security answer"})
                  else 
                      setErrors({...errors,securityAnswerErr: ""});
                }}
                placeholder="Enter your answer"
                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base
                 rounded-xl border border-purple-200 bg-white focus:outline-none
                  focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
             required />

              {errors.securityAnswerErr && (
                <small className="block text-xs text-blue-500 mt-1 px-2">
                  {errors.securityAnswerErr}
                </small>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="submit"
                className="flex-1 py-3 sm:py-3.5 px-4 text-sm sm:text-base
                 font-semibold text-white bg-purple-500 hover:bg-purple-600 
                 active:bg-purple-700 rounded-xl shadow-md hover:shadow-lg 
                 transition-all duration-300"
              >
                Sign Up
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 sm:py-3.5 px-4 text-sm sm:text-base
                 font-semibold text-purple-600 bg-purple-100 hover:bg-purple-200
                  active:bg-purple-300 rounded-xl shadow-md hover:shadow-lg 
                  transition-all duration-300"
              >
                Reset
              </button>

            </div>

          </form>

          {/* Sign In Link */}
          <div className="text-center mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-purple-100">

            <p className="text-xs sm:text-sm md:text-base text-gray-500">
              Already have an account?{" "}

              <Link
                to="/signin"
                className="text-purple-600 font-semibold hover:text-purple-800 transition-colors"
              >
                Sign in here
              </Link>
            </p>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-purple-400 mt-5 sm:mt-6">
          Bloom every day. One small step at a time. 🌱
        </p>

      </div>
    </main>

  );
}

export default Signup;





