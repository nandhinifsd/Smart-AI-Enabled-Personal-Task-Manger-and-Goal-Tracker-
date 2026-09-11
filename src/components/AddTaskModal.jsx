import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/taskSlice";


const AddTaskModal = ({ goal, onClose, onTaskAdded }) => {
     const dispatch = useDispatch();

  const [task, setTask] = useState({
    taskName: "",
    description: "",
    dueDate: "",
    priority: "Low"
  });
   const handleChange = (e) => {
    const { name, value } = e.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      isSaved: true,
      completed: false,
      closedDate: "",
      todoToday: false,
      source: "user",
    };

    // Create the updated task array
    const updatedTaskArray = [
      ...goal.taskArray,
      newTask,
    ];

    try {
      // Update the goal in db.json
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
        throw new Error("Failed to add task");
      }

      // Update Redux
      dispatch(setTasks(updatedTaskArray));
      // Tell parent that task was added
      if (onTaskAdded) {
        onTaskAdded(updatedTaskArray);
      }

      // Close modal
      onClose();

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-semibold text-purple-800">
            Add New Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>

        </div>

        {/* Goal information */}
        <div className="mb-5 rounded-lg bg-purple-50 p-3">

          <p className="text-sm text-gray-500">
            Goal
          </p>

          <p className="font-semibold text-purple-800">
            {goal.goalName}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Goal ID: {goal.id}
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Task Name */}
          <div>

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Task Name
            </label>

            <input
              type="text"
              name="taskName"
              value={task.taskName}
              onChange={handleChange}
              required
              placeholder="Enter task name"
              className="w-full rounded-lg border border-purple-200
                         px-3 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-purple-300"
            />

          </div>

          {/* Description */}
          <div>

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter task description"
              className="w-full rounded-lg border border-purple-200
                         px-3 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-purple-300"
            />

          </div>

          {/* Due Date */}
          <div>

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-purple-200
                         px-3 py-2
                         focus:outline-none
                         focus:ring-2 focus:ring-purple-300"
            />

          </div>

          {/* Priority */}
          <div>

            <label className="block mb-1 text-sm font-medium text-gray-700">
              Priority
            </label>

            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full rounded-lg border border-purple-200
                         px-3 py-2
                         bg-white
                         focus:outline-none
                         focus:ring-2 focus:ring-purple-300"
            >

              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>

            </select>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-100
                         px-4 py-2 text-gray-700
                         hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-lg bg-purple-500
                         px-4 py-2 text-white
                         hover:bg-purple-600
                         transition"
            >
              Add Task
            </button>

          </div>

        </form>

      </div>

   
      
    </div>
  );
}

export default AddTaskModal;




