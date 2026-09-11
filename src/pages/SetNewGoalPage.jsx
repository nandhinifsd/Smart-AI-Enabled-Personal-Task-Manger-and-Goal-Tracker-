import React, { useState,useEffect } from 'react';
import Addtask from '../components/Addtask';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AITaskGenerator from "../components/AItaskGenerator";
import { clearTasks } from "../redux/taskSlice";

const SetNewGoalPage = () => {
  console.log("SetNewGoalPage rendered");
   
    const uname = useSelector((data) => data.auth.user);
    console.log("SET GOAL USER:", uname);
    const navigate=useNavigate();
    
      const [goal, setGoal] = useState({
    goalName: "",
    category: "",
  });
   const redux_tasks = useSelector((state) => state.tasks);
 
  const[subtaskMode,setSubtaskMode]=useState("");
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showAddAITask,setShowAddAITask]=useState(false);
  const dispatch=useDispatch();
  useEffect(() => {
  dispatch(clearTasks());
}, [dispatch]);

  
const goalCategories = [
  "Career Development",
  "Business Development",
  "Learning & Education",
  "Fitness & Health",
  "Personal Care",
  "Home Organisation",
  "Household & Family",
  "Financial Goals",
  "Children Development",
  "Relationship Goals",
  "Social & Community",
  "Hobbies & Creativity",
  "Travel & Experiences",
  "Bucket List",
  "Spiritual & Mindfulness",
  "Personal Growth",
  "Self-Care & Wellbeing",
  "Meal Planning & Nutrition",
  "Home Improvement",
  "Other"
];
 async function createGoal(event)
   {
    //console.log("event ",event);
    event.preventDefault();

  //console.log("1. Before finalGoal");
    const finalGoal={...goal,taskArray:redux_tasks.filter(task=>task.isSaved===true),
      userid:uname[0]?.id
    }
    console.log(finalGoal);
     //console.log("2. finalGoal:", finalGoal);
  //console.log("3. user before fetch:", uname);

    try {
    //   console.log("4. Before fetch");

        const response = await fetch("https://smart-ai-enabled-personal-task-manger-and-goal-t-production.up.railway.app/goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalGoal)
        });
  //console.log("5. Fetch completed");
    //console.log("6. user after fetch:", name);

        if (!response.ok) {
            throw new Error("Failed to create goal");
        }
    //console.log("7. Before response.json()");
    //console.log("8. Goal saved:", savedGoal);
    //console.log("9. user after response.json():", name);
       
      navigate("/taskmanager/goals");

    } catch (error) {
        console.error("Error creating goal:", error);
       // console.error("10. Error:", error);
    }
};


  return (
    
    <div className="w-full min-w-screen lg:w-[75%] lg:min-w-[75%] h-auto min-h-screen flex justify-center
     items-center bg-gradient-to-br from-white to-pink-50 
    border-b-4 border-pink-100 absolute top-[15%] left-0 lg:left-[25%]  z-10 shadow-lg px-4 py-8">
      <form
        onSubmit={createGoal}
        className="w-full max-w-xxl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-purple-100"
      >
         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 text-center mt-8">
            Set Your New Goal Here
          </h1>
    
          <p className="text-gray-500 mt-2 text-center mb-2">
            Turn something you wish for into something you can achieve.
          </p>
        


        {/* Goal Name */}
        <div className="mb-5">

          <label
            htmlFor="goalName"
            className="block mb-2 font-semibold text-purple-800"
          >
            Goal Name
          </label>

          <input
            id="goalName"
            type="text"
            name="goalName"
            value={goal.goalName}
            onChange={(e)=>{
                setGoal({
      ...goal,
      goalName: e.target.value,
    });
            }}
            placeholder="Eg: Start my own home bakery"
            className="w-full border border-purple-300 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

        </div>

        {/**Category */}
        <label
            htmlFor="goalCategory"
            className="block mb-2 font-semibold text-purple-800"
          >
            Goal Category
          </label>
        <select id="goalCategory"
                 name="category"
                value={goal.category}
                onChange={(e) => {
                setGoal({
                      ...goal,
                    category: e.target.value
                    });
            }}
            className="w-full border border-purple-300 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2">
            <option value="">Select a category</option>

                {goalCategories.map((category, index) => (
                            <option key={index} value={category}>
                                                {category}
                                                    </option>
                            ))}
            </select>

                <div className="mb-4">
                <label className="block mb-2 font-medium text-purple-800">
                                 How would you like to create your subtasks?
                </label>

                <div className="flex flex-col sm:flex-row gap-4">

                            {/* Manual option */}
                            <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                 type="radio"
                                 name="subtaskMode"
                                 value="manual"
                                 checked={subtaskMode === "manual"}
                                 onChange={(e) => {setSubtaskMode(e.target.value);  
                                                       }}
                                 className="accent-purple-500"
                            />
                            <span>Manually add subtasks</span>
                            </label>

                            {/* AI option */}
                            <label className="flex items-center gap-2 cursor-pointer">
                             <input
                                     type="radio"
                                      name="subtaskMode"
                                     value="ai"
                                     checked={subtaskMode === "ai"}
                                     onChange={(e) => {setSubtaskMode(e.target.value)
                                                    }}
                                     className="accent-purple-500"
                                />
                                <span>Generate subtasks with AI</span>
                        </label>

                   </div>
</div>

{subtaskMode === "manual" && (
  <div className="mb-4 w-full bg-red-50 rounded-xl">
    <h1 className=" mb-1 font-medium bg-purple-100 text-center p-1 rounded-xl">
      Add Subtasks
    </h1>
{/**Add task manually */}
        <div className="w-full justify-center mt-1 p-4 min-h-screen h-auto">
        <Addtask mode={"manual"} />
        </div>
        </div>
  )
}
{subtaskMode === "ai" && (
  <div className="mb-4 p-4 bg-purple-50 rounded-lg">
    <p className="text-purple-800 mb-3">
      AI will generate subtasks based on your goal.
    </p>

    <button
      type="button"
      className="px-5 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
       onClick={() => setShowAIGenerator(true)}
    >
      Generate Subtasks with AI
    </button>
    {showAIGenerator && (
       <div className="w-full justify-center mt-1 p-4 min-h-screen h-auto">
                <AITaskGenerator goal={goal} setShowAIGenerator={setShowAIGenerator} setShowAddAITask={setShowAddAITask} />
                
        </div>     

                )}
      {showAddAITask &&
        <div className="w-full flex flex-col justify-center mt-1 p-4 min-h-screen h-auto">
        <Addtask mode={"ai"} />
        </div>
      }          
  </div>
)}
 <button
          type="submit"
          className="w-full py-3 px-6
                     text-white font-semibold
                     bg-purple-500 hover:bg-purple-600
                     active:bg-purple-700
                     rounded-xl shadow-md hover:shadow-lg
                     transition-all duration-300"
        >
          Create Goal
        </button>

      </form>

    </div>
  );
};
export default SetNewGoalPage;




