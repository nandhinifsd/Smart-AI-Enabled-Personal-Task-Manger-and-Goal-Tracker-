import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setTodos, addTodo,deleteTodo } from "../redux/todoSlice";


const Todo = () => {

  const user = useSelector((state) => state.auth.user);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

const [showAddTask, setShowAddTask] = useState(false);
const [newTodo, setNewTodo] = useState({
  title: "",
  category: "",
  priority: "Medium"
});
 async function handleAddTodo() {

 

  if (!user || !user[0]?.id) {
  return;
}
 if (!newTodo.title.trim()) {
    return;
  }
  const todo = {
    userid: user[0].id,
    title: newTodo.title,
    category: newTodo.category,
    priority: newTodo.priority,
    dueDate: new Date().toISOString(),
    completed: false,
    completedDate: "",
    source: "standalone"
  };

  try {

    const response = await fetch(
      "http://localhost:3000/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    const savedTodo = await response.json();

    // Add database task to Redux
    dispatch(addTodo(savedTodo));

    setShowAddTask(false);

    setNewTodo({
      title: "",
      category: "",
      priority: "Medium"
    });

  } catch (error) {

    console.error("Error adding task:", error);

  }
}


function recordCompletion() {
  const today = new Date().toISOString().split("T")[0];

  const savedCounts =
    JSON.parse(localStorage.getItem("dailyCompletionCounts")) || {};

  savedCounts[today] = (savedCounts[today] || 0) + 1;

  localStorage.setItem(
    "dailyCompletionCounts",
    JSON.stringify(savedCounts)
  );
  console.log(savedCounts);
}


async function  handleToggleTodo(todo)
 {

  // Only goal tasks need to be updated in the goals database
  if (todo.source !== "goal") {

  try {

    const response = await fetch(
      `http://localhost:3000/tasks/${todo.id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    // Record completion before removing the task
    recordCompletion();

    // Remove task from Redux
    dispatch(deleteTodo(todo.id));

    return;

  } catch (error) {

    console.error("Error deleting task:", error);

  }

}
else{
  try {

    // 1. Fetch the goal
    const response = await fetch(
      `http://localhost:3000/goals/${todo.goalId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch goal");
    }

    const goal = await response.json();


    // 2. Find the task and update it
    const updatedTaskArray = goal.taskArray.map((task) => {

      if (task.id === todo.id) {

        return {
          ...task,
          completed: true,
          completedDate:new Date().toISOString(),
          todoToday: false
        };

      }

      return task;

    });


    // 3. Update the goal in db.json
    const updateResponse = await fetch(
      `http://localhost:3000/goals/${todo.goalId}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          taskArray: updatedTaskArray
        })
      }
    );


    if (!updateResponse.ok) {
      throw new Error("Failed to update task");
    }

    // Record today's completion
    if (!todo.completed) {
      recordCompletion();
    }


    // 4. Update Redux
    dispatch(deleteTodo(todo.id));

    
  } catch (error) {

    console.error("Error updating task:", error);

  }
}
};

  

  useEffect(() => {

  if (!user || !user[0]?.id) {
    return;
  }

  async function fetchTodos() {

    try {

      // -----------------------------
      // 1. Fetch user's goals
      // -----------------------------

      const goalResponse = await fetch(
        `http://localhost:3000/goals?userid=${user[0].id}`
      );

      const goals = await goalResponse.json();

      const dailyTodos = [];

      goals.forEach((goal) => {

        goal.taskArray.forEach((task) => {

          if (
            task.todoToday === true &&
            task.completed === false
          ) {

            dailyTodos.push({
              id: task.id,
              title: task.taskName,
              category: goal.goalName,
              priority: task.priority,
              completed: task.completed,
              dueDate: task.dueDate,
              goalId: goal.id,
              source: "goal"
            });

          }

        });

      });


      // -----------------------------
      // 2. Fetch standalone tasks
      // -----------------------------

      const taskResponse = await fetch(
        `http://localhost:3000/tasks?userid=${user[0].id}`
      );

      const standaloneTodos = await taskResponse.json();


      // -----------------------------
      // 3. Put everything in Redux
      // -----------------------------

      dispatch(
        setTodos([
          ...dailyTodos,
          ...standaloneTodos
        ])
      );

    } catch (error) {

      console.error("Error fetching todos:", error);

    }

  }

  fetchTodos();

}, [user, dispatch]);

  return (
     <div className="w-full min-w-screen lg:w-[75%] lg:min-w-[75%] h-auto min-h-screen flex  flex-col 
     items-center bg-gradient-to-br from-white to-pink-50 
    border-b-4 border-pink-100 absolute top-[15%] left-0 lg:left-[25%]  z-5 shadow-lg px-4 py-8">
         <div className="max-w-5xl w-full flex flex-col justify-center items-center">
           <div className="flex flex-col items-center justify-evenly gap-4 mb-8">

       <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 text-center pt-6 pb-0">
            Create Your Personalised Todo List Here
          </h1>
           <p className="text-gray-500 mt-2 text-center mb-2">
            Plan your Entire Day Here
          </p>
          </div>
            {/* Add Task Button */}
          <button
            className="
                w-sm bg-violet-600 hover:bg-violet-700
               text-white font-medium px-5 py-3 rounded-xl shadow-md transition duration-200 mb-8"
               onClick={() => setShowAddTask(true)}
          >
            + Add Task
          </button>
          </div>
          <div className="space-y-4">

                 <div className="space-y-4">

          {todos.length === 0 ? (

            /* Empty State */
            <div
              className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-purple-100
                p-10
                text-center
              "
            >

              <h2 className="text-xl font-semibold text-violet-900">
                No tasks for today 🎉
              </h2>

              <p className="text-gray-500 mt-2">
                You are all caught up!
              </p>

            </div>

          ) : (

            /* Todo List */
            todos.map((todo) => (

              <div
                key={todo.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  border
                  border-purple-100
                  p-5
                  flex
                  items-center
                  gap-4
                  hover:shadow-md
                  transition
                  duration-200
                "
              >

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
  onChange={() =>handleToggleTodo(todo)}
                  className="
                    w-5
                    h-5
                    accent-violet-600
                    cursor-pointer
                  "
                />


                {/* Task Information */}
                <div className="flex-1 min-w-0">

                  <h2 className={`text-lg font-semibold text-gray-800  ${
      todo.completed
        ? "text-gray-400 line-through"
        : "text-gray-800"
    }`}>
                    {todo.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {todo.category}
                  </p>

                  {/* Priority */}
                <span
                  className={`
                    px-3
                    py-1 my-2
                    rounded-full
                    text-xs
                    font-medium
                    ${
                      todo.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : todo.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {todo.priority}
                </span>

              </div>
              </div>

            ))

          )}


                </div>

                    </div>
      {showAddTask && (

  <div className="
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    bg-black/40
    px-4
  ">

    {/* Modal */}
    <div className="
      w-full
      max-w-md
      bg-white
      rounded-2xl
      shadow-2xl
      p-6
    ">

      {/* Modal Heading */}
      <h2 className="
        text-2xl
        font-bold
        text-violet-900
        mb-6
      ">
        Add New Task
      </h2>


      {/* Task Title */}
      <div className="mb-4">

        <label className="
          block
          text-sm
          font-medium
          text-gray-700
          mb-2
        ">
          Task Title
        </label>

        <input
          type="text"
          placeholder="Enter task title"
           value={newTodo.title}
  onChange={(e) =>
    setNewTodo({
      ...newTodo,
      title: e.target.value
    })
  }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-violet-400
          "
        />

      </div>


      {/* Category */}
      <div className="mb-4">

        <label className="
          block
          text-sm
          font-medium
          text-gray-700
          mb-2
        ">
          Category
        </label>

        <input
          type="text"
          placeholder="Enter category"
            value={newTodo.category}
  onChange={(e) =>
    setNewTodo({
      ...newTodo,
      category: e.target.value
    })
  }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-violet-400
          "
        />

      </div>


      {/* Priority */}
      <div className="mb-6">

        <label className="
          block
          text-sm
          font-medium
          text-gray-700
          mb-2
        ">
          Priority
        </label>

        <select
          value={newTodo.priority}
  onChange={(e) =>
    setNewTodo({
      ...newTodo,
      priority: e.target.value
    })
  }

          className="
            w-full
            border
            border-gray-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-violet-400
          "
        >

          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>

        </select>

      </div>


      {/* Buttons */}
      <div className="
        flex
        justify-end
        gap-3
      ">

        {/* Cancel */}
        <button
          onClick={() => setShowAddTask(false)}
          className="
            px-5
            py-2.5
            rounded-xl
            border
            border-gray-300
            text-gray-600
            hover:bg-gray-100
            transition
          "
        >
          Cancel
        </button>


        {/* Add */}
        <button
          className="
            px-5
            py-2.5
            rounded-xl
            bg-violet-600
            text-white
            hover:bg-violet-700
            transition
          "
          onClick={handleAddTodo}
        >
          Add Task
        </button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}

export default Todo;

