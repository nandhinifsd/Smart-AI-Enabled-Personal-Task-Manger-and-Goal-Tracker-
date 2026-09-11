import React, { useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";

const Dashboard = () => {
    const todos = useSelector((state) => state.todos);
     const user = useSelector((state) => state.auth.user);
    const [allCompletedTasks, setAllCompletedTasks] = useState([]);

  const dailyCompletionCounts =
  JSON.parse(localStorage.getItem("dailyCompletionCounts")) || {};

  useEffect(() => {
  if (!user || !user[0]?.id) return;

  async function fetchCompletedTasks() {
    try {
      const taskResponse = await fetch(
        `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/tasks?userid=${user[0].id}`
      );

      const standaloneTasks = await taskResponse.json();

      const goalResponse = await fetch(
        `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/goals?userid=${user[0].id}`
      );

      const goals = await goalResponse.json();

      const completedGoalTasks = [];

      goals.forEach((goal) => {
        goal.taskArray.forEach((task) => {
          if (task.completed === true) {
            completedGoalTasks.push({
              ...task,
              goalId: goal.id,
              source: "goal"
            });
          }
        });
      });

      const completedStandaloneTasks = standaloneTasks.filter(
        (task) => task.completed === true
      );

      setAllCompletedTasks([
        ...completedGoalTasks,
        ...completedStandaloneTasks
      ]);

    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  }

  fetchCompletedTasks();
}, [user]);

    const todoCount = todos.filter(
  (todo) => !todo.completed
).length;

const completedCount = allCompletedTasks.length;

const highPriorityCount = todos.filter(
  (todo) => todo.priority === "High" && !todo.completed
).length;

const overdueCount = todos.filter((todo) => {

  if (!todo.dueDate || todo.completed) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(todo.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;

}).length;

function getStreakStartDate() {

  const savedDate = localStorage.getItem("streakStartDate");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (savedDate) {

    const streakStartDate = new Date(savedDate);
    streakStartDate.setHours(0, 0, 0, 0);

    const difference =
      today.getTime() - streakStartDate.getTime();

    const daysPassed =
      difference / (1000 * 60 * 60 * 24);

    if (daysPassed >= 7) {

      localStorage.setItem(
        "streakStartDate",
        today.toISOString()
      );

      return today;
    }

    return streakStartDate;
  }

  localStorage.setItem(
    "streakStartDate",
    today.toISOString()
  );

  return today;
}

const streakStartDate = getStreakStartDate();

const productivityDays = [];

for (let i = 0; i < 7; i++) {

  const date = new Date(streakStartDate);

  date.setDate(date.getDate() + i);

  date.setHours(0, 0, 0, 0);


  const count = allCompletedTasks.filter((task) => {
  if (!task.completedDate) return false;

  const completedDate = new Date(task.completedDate);

  return (
    completedDate.getFullYear() === date.getFullYear() &&
    completedDate.getMonth() === date.getMonth() &&
    completedDate.getDate() === date.getDate()
  );
}).length;

  productivityDays.push({
    day: `Day ${i + 1}`,
    date: date,
    completedCount: count
  });
}

let streakCount = 0;

for (let i = productivityDays.length - 1; i >= 0; i--) {
  if (productivityDays[i].completedCount > 0) {
    streakCount++;
  } else {
    break;
  }
}

console.log("DASHBOARD TODOS:", todos);

console.log(
  "COMPLETED TODOS:",
  todos.filter(todo => todo.completed)
);

console.log(
  "COMPLETED DATES:",
  todos
    .filter(todo => todo.completed)
    .map(todo => todo.completedDate)
);

return (
  <div
  className="w-full
             min-h-screen
             flex flex-col justify-center items-center
             bg-gradient-to-br from-white to-pink-50
             border-b-4 border-pink-100
             absolute top-[15%] left-0
             lg:left-[25%] lg:w-[75%]
             z-10 shadow-lg px-4 py-8"
>

    {/* Dashboard heading */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-purple-700">
        Your Dashboard 🌸
      </h1>

      <p className="text-gray-500 mt-1 mb-6">
        Here's a quick look at your tasks today
      </p>
    </div>

    {/* Task statistics */}
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">

      {/* Todo */}
      <div className=" flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-10 border border-purple-100">
        <p className="text-gray-500 text-sm">
          Todo
        </p>

        <p className="text-3xl font-bold text-purple-600 mt-2">
          {todoCount}
        </p>
      </div>


      {/* Completed */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-5 border border-green-100">
        <p className="text-gray-500 text-sm">
          Completed
        </p>

        <p className="text-3xl font-bold text-green-600 mt-2">
          {completedCount}
        </p>
      </div>


      {/* High Priority */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-5 border border-pink-100">
        <p className="text-gray-500 text-sm">
          High Priority
        </p>

        <p className="text-3xl font-bold text-pink-600 mt-2">
          {highPriorityCount}
        </p>
      </div>

      {/** OverDue Tasks */}

      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-5 border border-pink-100">
        <p className="text-gray-500 text-sm">
          Over Due
        </p>

        <p className="text-3xl font-bold text-pink-600 mt-2">
          {overdueCount}
        </p>
      </div>

    </div>

    <div className=" w-full bg-white rounded-2xl shadow-md p-6 mt-16">

  <h2 className="text-xl font-semibold text-purple-600 text-center">
    Productivity Streak 🔥
  </h2>

  <p className="text-sm text-gray-500 mt-1 text-center">
    Your productivity over 7 days
  </p>

  <div className="text-center mt-5 mb-6">

    <p className="text-4xl font-bold text-purple-600">
      🔥 {streakCount}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Day Streak
    </p>

  </div>


  <div className="grid grid-cols-7 gap-3 mt-6">

    {productivityDays.map((day) => (

      <div
        key={day.day}
        className="text-center"
      >

        <p className="text-xs text-gray-500 mb-2">
          {day.day}
        </p>

        <div
          className={`
            h-3 rounded-full
            ${
              day.completedCount > 0
                ? "bg-green-500"
                : "bg-gray-200"
            }
          `}
        />

        <p className="text-sm font-semibold text-gray-700 mt-2">
          {day.completedCount}
        </p>

      </div>

    ))}

  </div>

</div>

  </div>
);

}

export default Dashboard;
