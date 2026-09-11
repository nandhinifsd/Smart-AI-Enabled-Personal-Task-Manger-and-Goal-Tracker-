import React,{ useState } from 'react';
import { generateTasks } from "../services/aiservice";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";


const AItaskGenerator = ({goal, setShowAIGenerator, setShowAddAITask }) => {
     const [aiForm, setAiForm] = useState({
   
    duration: "",
    dailyTime: "",
    difficulty: ""
  });
  const dispatch = useDispatch();
    function handleChange(e) {
    setAiForm({
      ...aiForm,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit() {
   

    console.log("AI FORM DATA:", aiForm);
    const result = await generateTasks({...goal,...aiForm});
  const formattedTasks = result.tasks.map((task, index) => ({
            id: Date.now() + index,
            taskName: task.taskName,
            description:`${task.description.whatToDo}\nQuick Tips: ${task.description.quickTips}`,
            dueDate: "",
            priority: task.description.priority || task.priority,
            isSaved: true,
            completed: false, 
            status: open,
            closedDate:"",
            todoToday:false,
            source: "ai"
}));

console.log("FORMATTED AI TASKS:", formattedTasks);
//adding each task to redux global store
    formattedTasks.forEach((task) => {
  dispatch(addTask(task));
});

    console.log("AI RESULT:", result);
    setShowAddAITask(true);
  }
  return (
    <div>
      <div className="w-full mt-4 p-6 bg-white border border-purple-200 rounded-2xl shadow-lg">

      <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-2">
        ✨ Generate Tasks with AI
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Tell us about your goal and AI will create tasks for you.
      </p>

      <div className="space-y-5">

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">
            How much time do you have?
          </label>

          <select
            name="duration"
            value={aiForm.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select duration</option>
            <option value="7">1 week</option>
            <option value="14">2 weeks</option>
            <option value="30">1 month</option>
            <option value="60">2 months</option>
            <option value="90">3 months</option>
            <option value="180">6 months</option>
            <option value="240">8 months</option>
            <option value="365">12 months</option>
          </select>
        </div>

        {/* Daily Time */}
        <div>
          <label className="block mb-1 font-medium">
            How much time can you spend each day?
          </label>

          <select
            name="dailyTime"
            value={aiForm.dailyTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select daily time</option>
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="3+ hours">3+ hours</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block mb-1 font-medium">
            Difficulty level
          </label>

          <select
            name="difficulty"
            value={aiForm.difficulty}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">

          <button
            type="button"
            className="flex-1 py-2 px-6 text-white font-semibold
                       bg-purple-800 hover:bg-purple-600
                       rounded-2xl shadow-md transition-all duration-300"
                         onClick={() => {
                handleSubmit();
                setShowAIGenerator(false);
                
            }}
          >
            ✨ Generate Tasks
          </button>

          <button
            type="button"
            onClick={() => {
               setShowAIGenerator(false);
            }}
            className="flex-1 py-2 px-6 text-gray-700 font-semibold
                       bg-gray-100 hover:bg-gray-200
                       rounded-2xl shadow-md transition-all duration-300"
          >
            Cancel
          </button>
    </div>
    </div>
    </div>
   
    </div>
  );
}

export default AItaskGenerator;
