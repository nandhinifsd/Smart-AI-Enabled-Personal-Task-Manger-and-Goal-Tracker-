import React, { useState,useEffect, use } from 'react';
import { useSelector } from "react-redux";
import { setTasks } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import AddTaskModal from "../components/AddTaskModal";
import DeleteGoalModal from "../components/DeleteGoalModal";
import KanbanTaskCard from "../components/KanbanTaskCard";
import FiltersModal from "../components/FiltersModal";

const TaskKanban = () => {
  console.log("TaskKanban rendered");
const user = useSelector((data) => data.auth.user);
 console.log("Navbar user:",user);
 console.log(user[0].id);
 const [userGoals, setUserGoals]=useState([]);
 const [selectedGoal,setSelectedGoal]=useState(() => localStorage.getItem("selectedGoal") || "");
 const dispatch=useDispatch();
 const [showAddTask, setShowAddTask] = useState(false);
 const [showDeleteGoal, setShowDeleteGoal] = useState(false);
 const [showFilters, setShowFilters] = useState(false);
 const [filters, setFilters] = useState({
  priority: "All",
  dueDate: "All",
  status: "All",
  sortBy: "default"

});
//const [sortBy, setSortBy] = useState("default");
const selectedGoalObject = userGoals.find(
  (goal) => goal.id === selectedGoal
);


useEffect(() => {

    if (!user[0].id) return;
    async function fetchGoals() {
      console.log("inside fetch goals");
        const response = await fetch(
            `http://localhost:3000/goals?userid=${user[0].id}`);
        const data = await response.json();
        setUserGoals(data);
        console.log("userGoals")
      console.log("USER GOALS:", data);
    }

    fetchGoals();

}, [user[0].id]);
useEffect(() => {

  if (!selectedGoal) {
    dispatch(setTasks([]));
    return;
  }

  const selectedGoalObject = userGoals.find(
    (goal) => goal.id === selectedGoal
  );

  if (selectedGoalObject) {
    dispatch(setTasks(selectedGoalObject.taskArray));
    console.log(selectedGoalObject.taskArray)
  }

}, [selectedGoal, userGoals, dispatch]);

useEffect(() => {
  console.log("Applied Filters:", filters);
}, [filters]);

const allTasks = selectedGoalObject
  ? selectedGoalObject.taskArray
  : [];

const filteredTasks = allTasks.filter((task) => {

  if (filters.priority !== "All" && task.priority !== filters.priority)
    {
      return false;
  }

    // Status filter
  if (filters.status === "Pending") 
    {
    if (task.completed || task.todoToday) 
      {
      return false;
    }
  }
   if (filters.status === "Todo Today") {
    if (task.completed || !task.todoToday) {
      return false;
    }
  }

  if (filters.status === "Completed") {
    if (!task.completed) {
      return false;
    }
  }
  if (filters.status === "Todo Today") {
  if (task.completed || !task.todoToday) {
    return false;
  }
}

  // 3. DUE DATE
  if (filters.dueDate === "Overdue") {

    if (!task.dueDate) {
      return false;
    }

    const taskDate = new Date(task.dueDate);
    const today = new Date();

    taskDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (taskDate >= today) {
      return false;
    }
  }


  if (filters.dueDate === "Today") {

    if (!task.dueDate) {
      return false;
    }

    const taskDate = new Date(task.dueDate);
    const today = new Date();

    taskDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (taskDate.getTime() !== today.getTime()) {
      return false;
    }
  }


  if (filters.dueDate === "This Week") {

    if (!task.dueDate) {
      return false;
    }

    const taskDate = new Date(task.dueDate);
    const today = new Date();

    taskDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);

    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    if (taskDate < today || taskDate > endOfWeek) {
      return false;
    }
  }


  // Keep the task
  return true;
});
console.log(filteredTasks);

//sorting done here

const sortedTasks = [...filteredTasks].sort((a, b) => {

  if (filters.sortBy === "priority-high") {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1
    };

    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }

  if (filters.sortBy === "priority-low") {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1
    };

    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  if (filters.sortBy === "due-earliest") {
    return new Date(a.dueDate) - new Date(b.dueDate);
  }

  if (filters.sortBy === "due-latest") {
    return new Date(b.dueDate) - new Date(a.dueDate);
  }

  if (filters.sortBy === "name-az") {
    return a.taskName.localeCompare(b.taskName);
  }

  if (filters.sortBy === "name-za") {
    return b.taskName.localeCompare(a.taskName);
  }

  return 0;
});


const pendingTasks = sortedTasks.filter(
  (task) => !task.completed && !task.todoToday
);

const todoTodayTasks = sortedTasks.filter(
  (task) => !task.completed && task.todoToday
);

const completedTasks = sortedTasks.filter(
  (task) => task.completed
);

  return (
  <div
  className="w-full
             min-h-screen
             flex justify-center items-start
             bg-gradient-to-br from-white to-pink-50
             border-b-4 border-pink-100
             absolute top-[15%] left-0
             lg:left-[25%] lg:w-[75%]
             z-10 shadow-lg px-4 py-8"
>
  <div className="w-full flex flex-col items-center gap-4">

    {/* Goal Dropdown */}
    <select
      value={selectedGoal}
      onChange={(e) => {
              const goalId = e.target.value;

                setSelectedGoal(goalId);
                localStorage.setItem("selectedGoal", goalId);
                        }}
      className="w-full p-3 border border-purple-300 rounded-lg
                 bg-white text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-purple-300"
    >
      <option value="">Select a goal</option>

      {userGoals.map((goal) => (
        <option key={goal.id} value={goal.id}>
          {goal.goalName}
        </option>
      ))}
    </select>

    {/* Buttons */}
    <div className="w-full flex gap-3">
      <button
        className="flex-1 px-4 py-2 rounded-lg
                   bg-purple-500 text-white
                   hover:bg-purple-600 transition
                   disabled:opacity-50 disabled:cursor-not-allowed"
                   onClick={() => setShowAddTask(true)}
                   disabled={!selectedGoal}
      >
        Add New Task
      </button>
      <button
    className="flex-1 px-4 py-2 rounded-lg
               bg-pink-500 text-white
               hover:bg-pink-600 transition
               disabled:opacity-50
               disabled:cursor-not-allowed"
    onClick={() => setShowFilters(true)}
    disabled={!selectedGoal}
  >
    Apply Filters
  </button>
      <button
        className="flex-1 px-4 py-2 rounded-lg
                   bg-red-100 text-red-600
                   hover:bg-red-200 transition
                   disabled:opacity-50
                    disabled:cursor-not-allowed"
                    disabled={!selectedGoal}
                    onClick={() => setShowDeleteGoal(true)}
      >

        Delete Goal
      </button>
    </div>
   <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

  {/* Pending Column */}
  <div className="bg-white rounded-xl shadow-md p-4">

    <h2 className="text-lg font-semibold text-purple-800 mb-4">
      Pending
    </h2>

    {pendingTasks.map((task) => (
      <KanbanTaskCard
      key={task.id}
      task={task}
       goal={selectedGoalObject}
    />
    ))}

  </div>


  {/* Todo Today Column */}
  <div className="bg-white rounded-xl shadow-md p-4">

    <h2 className="text-lg font-semibold text-pink-700 mb-4">
      Todo Today
    </h2>

    {todoTodayTasks.map((task) => (
      
    <KanbanTaskCard
      key={task.id}
      task={task}
       goal={selectedGoalObject}
    />
  ))}

   

  </div>


  {/* Completed Column */}
  <div className="bg-white rounded-xl shadow-md p-4">

    <h2 className="text-lg font-semibold text-green-700 mb-4">
      Completed
    </h2>

    {completedTasks.map((task) => (
        <KanbanTaskCard
      key={task.id}
      task={task}
       goal={selectedGoalObject}
    />
     
      
    ))}

  </div>

</div>
      {showAddTask && selectedGoal && (
        <AddTaskModal
            goal={selectedGoalObject}
            onClose={() => setShowAddTask(false)}
        />
      )}
      {showFilters && selectedGoal && (
  <FiltersModal
    onClose={() => setShowFilters(false)}
    onApply={(newFilters) => {
      setFilters(newFilters);
  }} />
      )}
      {showDeleteGoal && selectedGoalObject && (
  <DeleteGoalModal
    goal={selectedGoalObject}
    onClose={() => setShowDeleteGoal(false)}
    onGoalDeleted={(goalId) => {
      
      // Remove the deleted goal from local state
      setUserGoals((previousGoals) =>
        previousGoals.filter(
          (goal) => goal.id !== goalId
        )
      );

      // Clear selected goal
      setSelectedGoal("");

      // Clear Redux tasks
      dispatch(setTasks([]));
    }}
  />
)}
  </div>




</div>
  );
}

export default TaskKanban;
