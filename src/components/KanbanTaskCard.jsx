import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask, setTasks } from "../redux/taskSlice";

const KanbanTaskCard = ({ task, goal, onTaskArrayChange }) => {

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [editedTask, setEditedTask] = useState({
    taskName: task.taskName,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
  });


  // Handle input changes
  function handleChange(e)
   {

    const { name, value } = e.target;

    setEditedTask({
      ...editedTask,
      [name]: value,
    });

  };


  // EDIT TASK
  async function handleSave ()
  {

    const updatedTask = {
      ...task,
      taskName: editedTask.taskName,
      description: editedTask.description,
      dueDate: editedTask.dueDate,
      priority: editedTask.priority,
    };


    // Create updated task array
    const updatedTaskArray = goal.taskArray.map((currentTask) =>
      currentTask.id === task.id
        ? updatedTask
        : currentTask
    );


    try {

      // Update db.json
      const response = await fetch(
        `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/goals/${goal.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskArray: updatedTaskArray,
          }),
        }
      );


      if (!response.ok) {
        throw new Error("Failed to update task");
      }


      // Update Redux
      dispatch(setTasks(updatedTaskArray));

      // Close edit mode
      setIsEditing(false);

    } catch (error) {

      console.error("Error updating task:", error);

    }

  };


  // DELETE TASK
  async function handleDelete () 
   {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.taskName}"?`
    );


    if (!confirmDelete) {
      return;
    }


    // Remove task from taskArray
    const updatedTaskArray = goal.taskArray.filter(
      (currentTask) => currentTask.id !== task.id
    );


    try {

      // Update db.json
      const response = await fetch(
        `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/goals/${goal.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskArray: updatedTaskArray,
          }),
        }
      );


      if (!response.ok) {
        throw new Error("Failed to delete task");
      }


      // Update Redux
      dispatch(setTasks(updatedTaskArray));

    } catch (error) {

      console.error("Error deleting task:", error);

    }

  };

 /* async function handleMoveToTodo () 
  {
  const updatedTask = {
    ...task,
    todoToday: true,
  };

  const updatedTaskArray = goal.taskArray.map((currentTask) =>
    currentTask.id === task.id ? updatedTask : currentTask
  );

  try {
    const response = await fetch(
      `http://localhost:3000/goals/${goal.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArray: updatedTaskArray,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to move task");
    }

    onTaskArrayChange(updatedTaskArray);
  } catch (error) {
    console.error("Error moving task:", error);
  }
};


async function handleMoveToPending()
 {
  const updatedTask = {
    ...task,
    todoToday: false,
    completed: false,
  };

  const updatedTaskArray = goal.taskArray.map((currentTask) =>
    currentTask.id === task.id ? updatedTask : currentTask
  );

  try {
    const response = await fetch(
      `http://localhost:3000/goals/${goal.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArray: updatedTaskArray,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to move task to pending");
    }

    onTaskArrayChange(updatedTaskArray);
  } catch (error) {
    console.error("Error moving task to pending:", error);
  }
};


async function handleMarkCompleted ()
 {
  const updatedTask = {
    ...task,
    completed: true,
  };

  const updatedTaskArray = goal.taskArray.map((currentTask) =>
    currentTask.id === task.id ? updatedTask : currentTask
  );

  try {
    const response = await fetch(
      `http://localhost:3000/goals/${goal.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArray: updatedTaskArray,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to complete task");
    }

    onTaskArrayChange(updatedTaskArray);
  } catch (error) {
    console.error("Error completing task:", error);
  }
};*/

async function handleTaskStatusChange (todoToday, completed) 
{

  const updatedTask = {
    ...task,
    todoToday: todoToday,
    completed: completed,
    completedDate: completed
    ? new Date().toISOString()
    : "",
  };

  const updatedTaskArray = goal.taskArray.map((currentTask) =>
    currentTask.id === task.id
      ? updatedTask
      : currentTask
  );

  try {

    const response = await fetch(
      `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/goals/${goal.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArray: updatedTaskArray,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task status");
    }

    onTaskArrayChange(updatedTaskArray);

  } catch (error) {

    console.error("Error updating task status:", error);

  }
};
async function handleCloseTask(){

  const updatedTask = {
    ...task,
    closedDate: new Date().toISOString(),
  };

  const updatedTaskArray = goal.taskArray.map((currentTask) =>
    currentTask.id === task.id
      ? updatedTask
      : currentTask
  );

  try {

    const response = await fetch(
      `https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/goals/${goal.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskArray: updatedTaskArray,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to close task");
    }

    onTaskArrayChange(updatedTaskArray);

  } catch (error) {

    console.error("Error closing task:", error);

  }
};
  return (

    <div
      className="bg-white rounded-lg p-4 mb-3
                 shadow-sm border border-purple-100
                 hover:shadow-md transition"
    >

      {!isEditing ? (

        <>
          {/* Task Name */}

          <h3 className="font-semibold text-gray-800">
            {task.taskName}
          </h3>


          {/* Description */}

          {task.description && (
            <p className="text-sm text-gray-500 mt-2">
              {task.description}
            </p>
          )}


          {/* Priority */}

          <div className="mt-3">

            <span
              className={`text-xs px-2 py-1 rounded-full
                ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
            >
              {task.priority}
            </span>

          </div>


          {/* Due Date */}

          {task.dueDate && (
            <p className="text-xs text-gray-500 mt-3">
              Due: {task.dueDate}
            </p>
          )}

          {!task.completed && !task.todoToday && (
                <label className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                      <input
                             type="checkbox"
                             onChange={() => handleTaskStatusChange(true, false)}
                             className="w-4 h-4 accent-purple-500" />

                               Move to Todo Today
                            </label>
            )}
            {/* Todo Today Actions */}

            {!task.completed && task.todoToday && (
                      <div className="flex flex-col gap-3 mt-4">

                      <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                              type="checkbox"
                               onChange={() => handleTaskStatusChange(false, false)}
                              className="w-4 h-4 accent-purple-500"
                      />

                        Back to Pending
                      </label>

                      <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input
                              type="checkbox"
                               onChange={() => handleTaskStatusChange(false, true)}
                              className="w-4 h-4 accent-green-500"
                      />

                      Mark as Completed
                      </label>

  </div>
)}

          {/* Buttons */}
          {!task.completed && !task.todoToday && (
          <div className="flex gap-2 mt-4">

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex-1 px-3 py-2
                         rounded-lg
                         bg-purple-100
                         text-purple-700
                         text-sm
                         hover:bg-purple-200"
            >
              Edit
            </button>


            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 px-3 py-2
                         rounded-lg
                         bg-red-100
                         text-red-600
                         text-sm
                         hover:bg-red-200"
            >
              Delete
            </button>

          </div>
          )}
          {task.completed && (
              <div className="mt-4">

            <button
                    type="button"
                    onClick={handleCloseTask}
                    disabled={task.closedDate}
                     className={
                                task.closedDate ? "w-full mt-4 px-3 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "w-full mt-4 px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                                 }>
  
                       {task.closedDate ? "Task Closed" : "Close Task"}
      
    </button>

  </div>
)}

        </>

      ) : (

        <>
          {/* Task Name */}

          <input
            type="text"
            name="taskName"
            value={editedTask.taskName}
            onChange={handleChange}
            className="w-full border border-purple-200
                       rounded-lg px-3 py-2
                       focus:outline-none
                       focus:ring-2 focus:ring-purple-300"
          />


          {/* Description */}

          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            rows="3"
            className="w-full mt-3
                       border border-purple-200
                       rounded-lg px-3 py-2
                       focus:outline-none
                       focus:ring-2 focus:ring-purple-300"
          />


          {/* Due Date */}

          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            className="w-full mt-3
                       border border-purple-200
                       rounded-lg px-3 py-2
                       focus:outline-none
                       focus:ring-2 focus:ring-purple-300"
          />


          {/* Priority */}

          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full mt-3
                       border border-purple-200
                       rounded-lg px-3 py-2
                       bg-white
                       focus:outline-none
                       focus:ring-2 focus:ring-purple-300"
          >

            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>

          </select>


          {/* Save / Cancel */}

          <div className="flex gap-2 mt-4">

            <button
              type="button"
              onClick={handleSave}
              className="flex-1 px-3 py-2
                         rounded-lg
                         bg-purple-500
                         text-white
                         text-sm
                         hover:bg-purple-600"
            >
              Save
            </button>


            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 px-3 py-2
                         rounded-lg
                         bg-gray-100
                         text-gray-700
                         text-sm
                         hover:bg-gray-200"
            >
              Cancel
            </button>

          </div>

        </>

      )}

    </div>
  );
};

export default KanbanTaskCard;