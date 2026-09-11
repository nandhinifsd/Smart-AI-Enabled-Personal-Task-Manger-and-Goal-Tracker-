import React from 'react';
import { ClipboardPlus,Trash2 } from 'lucide-react';

const Newtaskform = ({task,handleChange, saveTask, HandleDeleteTask}) => {
  return (
    <div className="w-full">
          <div className=" flex flex-col lg:flex-row gap-4 justify-evenly w-full" >
            {/* Task Name */}
            <div className="mb-4">
              <label className="block mb-1 font-medium w-auto">
                Task Name
              </label>

              <input
                type="text"
                name="taskName"
                value={task.taskName}
                onChange={(e) =>handleChange(task.id,e) }
                placeholder="Enter task name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-400"
              />
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={(e) =>handleChange(task.id,e)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-400"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-1 font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={task.priority}
                onChange={(e) =>handleChange(task.id,e)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black-400"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
     </div>
     
      <div className="mb-4 w-full">
                <label className="block mb-1 font-medium mt-2">
                Task Description
                </label>

                <textarea
                          name="description"
                          value={task.description}
                          onChange={(e) => handleChange(task.id, e)}
                          placeholder="Describe what needs to be done..."
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2
                          resize-none
                          focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </div>
 {/* Add Task button */}
      <div className='flex flex-row justify-between mb-2'>
       <button
                type="button"
                className="flex-1 py-0.5 sm:py-2 px-6 text-sm sm:text-base
                 font-semibold text-white bg-green-500 hover:bg-green-600 
                 active:bg-green-700 rounded-2xl shadow-md hover:shadow-lg 
                 transition-all duration-300 flex flex-row justify-center items-center gap-2 m-2" onClick={()=>{saveTask(task.id)}}
              >
               <ClipboardPlus size={20} /> Save 
              </button>
            <button
                type="button"
                className="flex-1 py-0.5 sm:py-2 px-6 text-sm sm:text-base
                 font-semibold text-white bg-red-400 hover:bg-red-600 
                 active:bg-red-700 rounded-2xl shadow-md hover:shadow-lg 
                 transition-all duration-300 flex flex-row justify-center items-center gap-2 m-2" onClick={()=>{HandleDeleteTask(task.id)}}
              >
               <Trash2 size={20} /> Delete 
              </button>

              </div>
              </div>
          
  );
}

export default Newtaskform;
