import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Progress = () => {
const user = useSelector((state) => state.auth.user);

  const [userGoals, setUserGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("");

  useEffect(() => {

    if (!user || !user[0]?.id) {
      return;
    }

    async function fetchGoals() {

      const response = await fetch(
        `http://localhost:3000/goals?userid=${user[0].id}`
      );

      const data = await response.json();
      console.log(data);
      setUserGoals(data);

      // Select first goal by default
      if (data.length > 0) {
        setSelectedGoal(data[0].id);
      }
    }

    fetchGoals();

  }, [user]);

const selectedGoalObject = userGoals.find(
  (goal) => goal.id === selectedGoal
);

//calculate pending, completed todo tasks and closed tasks

const tasks = selectedGoalObject?.taskArray || [];

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const todoTasks = tasks.filter(
  (task) => task.todoToday && !task.completed
).length;

const pendingTasks = tasks.filter(
  (task) => !task.completed && !task.todoToday
).length;

const closedTasks = tasks.filter(
  (task) => task.closedDate
).length;

//calculate overdue tasks

const today = new Date();
today.setHours(0, 0, 0, 0);

const overdueTasks = tasks.filter((task) => {

  if (!task.dueDate || task.completed) {
    return false;
  }

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

 if(dueDate < today)
  return true;

}).length;

//goal slider percentage
const progressPercentage =
  totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

    //data for piechart
    const chartData = [
  { name: "Pending",value: pendingTasks, color:"purple" },
  { name: "Todo",value: todoTasks, color:"pink" },
  { name: "Completed",value: completedTasks, color:"green" },
  { name: "Closed",value: closedTasks,  color:"grey" }
];


  return (
    < div className="w-full min-w-screen lg:w-[75%] lg:min-w-[75%] h-auto min-h-screen flex flex-col justify-center
     items-center bg-gradient-to-br from-white to-pink-50 
    border-b-4 border-pink-100 absolute top-[15%] left-0 lg:left-[25%]  z-10 shadow-lg px-4 py-4">
      
       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 text-center mt-2">
            Check Your Goal Progress Here
          </h1>
    
          <p className="text-gray-500 mt-2 text-center mb-2">
            See how far away are you to reach your goals.
          </p>
{/**Goal Dropdown list */}
             <div className=" w-full flex justify-center mb-8">

              <select
                      value={selectedGoal}
                      onChange={(e) => setSelectedGoal(e.target.value)}
                      className=" w-full max-w-md px-4 py-3 border border-purple-200 rounded-xl
                      bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              >

              <option value="">
                                Select a goal
              </option>

                {userGoals.map((goal) => (
                                <option key={goal.id} value={goal.id}>
                                {goal.goalName}
                                </option>
                 ))}

              </select>

            </div>

{/**Goal slider */}

<div className=" w-full bg-white rounded-2xl shadow-lg px-10 py-4 mb-8">

  <div className="flex justify-between items-center mb-3">

    <h2 className="text-xl font-semibold text-gray-800">
      Goal Progress
    </h2>

    <span className="text-2xl font-bold text-purple-600">
      {progressPercentage}%
    </span>

  </div>

  <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden">

    <div
      className="h-full bg-purple-600 rounded-full transition-all duration-500"
      style={{
        width: `${progressPercentage}%`
      }}
    />

  </div>

  <p className="text-sm text-gray-500 mt-3">
    {completedTasks} of {totalTasks} tasks completed
  </p>

</div>

{/**Task count cards*/}
<div className="w-full flex flex-row justify-evenly px-10 py-4">

<div className="grid grid-cols-1 grid-rows-5  gap-4 mb-8">

  <div className="bg-white rounded-2xl shadow-md p-6 text-center">
    <p className="text-gray-500 text-sm">Pending</p>
    <p className="text-3xl font-bold text-gray-800 mt-2">
      {pendingTasks}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6 text-center">
    <p className="text-gray-500 text-sm">Overdue</p>
    <p className="text-3xl font-bold text-red-500 mt-2">
      {overdueTasks}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6 text-center">
    <p className="text-gray-500 text-sm">Todo</p>
    <p className="text-3xl font-bold text-purple-600 mt-2">
      {todoTasks}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6 text-center">
    <p className="text-gray-500 text-sm">Completed</p>
    <p className="text-3xl font-bold text-green-600 mt-2">
      {completedTasks}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6 text-center">
    <p className="text-gray-500 text-sm">Closed</p>
    <p className="text-3xl font-bold text-gray-600 mt-2">
      {closedTasks}
    </p>
  </div>

</div>
<div className="bg-white rounded-2xl shadow-lg p-5">

  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Task Overview
  </h2>

  <div className="flex justify-center">


      <PieChart width={400} height={400}>

  <Pie
    data={chartData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={150}
    label
  >

    {chartData.map((entry, index) => (
      <Cell key={`cell-${index}`}
      fill={entry.color} />
    ))}

  </Pie>

  <Tooltip />

  <Legend />

</PieChart>

    </div>
     </div>
</div>
</div>
  );
}

export default Progress;
