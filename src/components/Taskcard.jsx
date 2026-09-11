
import React, { useState} from 'react';
import {Trash2,Pencil,BookText } from 'lucide-react';

const Taskcard = ({ task, handleEdit, handleDeleteTask }) => {

    const [showDescription, setShowDescription]=useState(false);
    function getPriorityColor(priority)
{
  if(priority=="High")
    return "bg-red-50 text-red-700";
  else if(priority=="Medium")
     return "bg-yellow-50 text-yellow-700";
    else 
     return "bg-green-50 text-green-700";
}

function getDueColor(dueDate) 
{
    const today = new Date();
    const due = new Date(dueDate);
    // Remove the time portion so we're comparing dates only
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const difference = due - today;
    const daysLeft = difference / (1000 * 60 * 60 * 24);
    if (daysLeft < 0) 
    {
        return "bg-red-50 text-red-700";
    }

    if (daysLeft < 7)
    {
        return "bg-yellow-50 text-yellow-700";
    }

    return "bg-green-50 text-green-700";
}


  return (
    <div className="w-full">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-md font-semibold text-purple-500">
                        {task.taskName}
                    </h1>
                    <div className="flex flex-row justify-evenly gap-6">
                     <div className="flex flex-row justify-between text-xs md:text-sm gap-4 mt-2">
                    <p className={`${getDueColor(task.dueDate)} px-4 py-2 rounded-xl shadow-lg font-semibold`}>
                            Due:{" "}{task.dueDate}</p>
                    <p className={`${getPriorityColor(task.priority)} px-4 py-2 rounded-xl shadow-lg font-semibold`}>{task.priority}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-2">

                         <button
                            type="button"
                            className="p-2 hover:bg-purple-100 rounded-lg transition-transform hover:scale-110" onClick={()=>setShowDescription(!showDescription)}>
                            <BookText size={18} />
                        </button>

                        <button
                            type="button"
                            className="p-2 hover:bg-purple-100 rounded-lg transition-transform hover:scale-110" onClick={()=>handleEdit(task.id)}>
                            <Pencil size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-transform hover:scale-110">
                            <Trash2 size={18} />
                        </button>
                    </div></div>
                  </div>

                   {showDescription &&
                     <p className="text-sm font-semibold text-violet-900 mt-3 mb-2">
                        {task.description}
                    </p>
                    }
               
            </div>
  );
}

export default Taskcard;


