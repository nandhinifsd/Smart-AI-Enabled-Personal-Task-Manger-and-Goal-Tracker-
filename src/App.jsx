import { useState } from 'react'
import React from 'react';

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from "./pages/Signin";
import Intro from './pages/Intro'; 
import Taskmanager from './pages/Taskmanager';
import Forgotpwd from './pages/Forgotpwd';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import TaskKanban from "./pages/TaskKanban";
import Todo from './pages/Todo';
import Progress from "./pages/Progress";
import Settings from './pages/Settings';
import SetNewGoalPage from "./pages/SetNewGoalPage"

function App() {
 console.log("app rendered");
  return (
    <>
     <BrowserRouter>
  
   
    <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/taskmanager" element={<Taskmanager />}>

          <Route index element={<Dashboard />} />
          <Route path="todays-plan" element={<Todo />} />
          <Route path="goals" element={<TaskKanban />} />
          <Route path="progress" element={<Progress />} />
          <Route path="set-goal" element={<SetNewGoalPage />} />
          

        
        </Route>
        <Route path="/viewprofile" element={<Settings />} />
        <Route path="/forgot-password" element={<Forgotpwd />} />
        
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
