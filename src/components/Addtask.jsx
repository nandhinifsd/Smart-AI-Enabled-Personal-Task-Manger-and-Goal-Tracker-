import React, { useState} from 'react';
import { ClipboardPlus } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask } from "../redux/taskSlice";
import Taskcard from "./Taskcard";
import Newtaskform from './Newtaskform';


const Addtask = ({mode}) => {
    
   const [showForm,setShowForm]=useState(false);
   
    const redux_tasks = useSelector((state) => state.tasks);
     //const [tasks,setTasks]=useState([]);
   
   const tasks=redux_tasks.filter(task=>task.source===mode);
   
     const dispatch=useDispatch();

    function createTask()
    {
            setShowForm(true);   
            const newTask={id: Date.now(),
                          taskName: "",
                          dueDate: "",
                          priority: "Low",
                            description: "",
                          isSaved:false,
                        completed:false,
                        status:"close",
                        closedDate:"",
                        todoToday:false,
                      source:mode};
                         // setTasks([...tasks,newTask]);
            dispatch(addTask(newTask));
            console.log(tasks);
    }
    function saveTask(id) {
      const updatedTasks = [...tasks];
      const index = updatedTasks.findIndex(task => task.id === id);
         updatedTasks[index] = {
                    ...updatedTasks[index],
                    isSaved: true
                            };

           //setTasks(updatedTasks);

          dispatch(updateTask({
                        id: tasks[index].id,
                        name: "isSaved",
                        value: true
                                }));
}

    function handleEdit(id)
    {
       const updatedTasks=[...tasks];
       const index = updatedTasks.findIndex(task => task.id === id);
        updatedTasks[index]={...updatedTasks[index],
                            isSaved:false};
                          //  setTasks(updatedTasks);

                             dispatch(updateTask({id: tasks[index].id,name: "isSaved",value: false }));
                             
                             
    }
    function HandleDeleteTask(id)
    {
          const updatedTasks = tasks.filter(task => task.id !== id);
            //  setTasks(updatedTasks);
            dispatch(deleteTask(id));
           if (updatedTasks.length === 0) {
                         setShowForm(false);
  }
}
              

    function handleChange(id, e) {
  const updatedTasks = [...tasks];
  const index = updatedTasks.findIndex(task => task.id === id);
  updatedTasks[index] = {
    ...updatedTasks[index],
    [e.target.name]: e.target.value,
  };
 // setTasks(updatedTasks);
  dispatch(updateTask({
    id: tasks[index].id,
    name: e.target.name,
    value: e.target.value
}));
  console.log(tasks);

}

  return (

    <div className="flex flex-col gap-4 gap-3">
       {!showForm &&
              <button
                type="button"
                className=" w-full lg:w-auto w-flex-1 justify-center py-0.5 sm:py-2 px-6 
                text-sm sm:text-base
                 font-semibold text-white bg-purple-800 hover:bg-purple-600 
                 active:bg-purple-700 rounded-2xl shadow-md hover:shadow-lg 
                 transition-all duration-300 flex flex-row  justify-center items-center gap-2" onClick={createTask}
              >
               <ClipboardPlus size={32} /> Task 
              </button>}

                 <div className="w-full">

      {/* Existing task forms */}
      <div>
        {tasks.map((task,index) => (
            <div key={task.id} className='flex flex-col gap-4 justify-center items-center p-5 border border-purple-200 rounded-xl shadow-sm gap-2'>
          
          <h1 className=  "mb-1 font-medium w-auto text-purple-800">Task - {index+1}</h1>
           {task.isSaved ? (

            // SAVED TASK CARD
            <Taskcard task={task} handleEdit={handleEdit} handleDeleteTask={HandleDeleteTask} />
           
        ) : (
          <Newtaskform  task={task} handleChange={handleChange} saveTask={saveTask} HandleDeleteTask={HandleDeleteTask} /> 
        )}
          
         
    </div>))}
    {showForm &&
     <button
                type="button"
                className=" w-full lg:w-auto w-flex-1 justify-center py-0.5 sm:py-2 px-6 
                text-sm sm:text-base
                 font-semibold text-white bg-purple-800 hover:bg-purple-600 
                 active:bg-purple-700 rounded-2xl shadow-md hover:shadow-lg 
                 transition-all duration-300 flex flex-row  justify-center items-center gap-2 mt-3" onClick={createTask}
              >
               <ClipboardPlus size={32} /> Task 
              </button>
    }
    </div>
    </div>

    </div>
    
  );
}

export default Addtask;
