
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice ({
  name: "tasks",

  initialState:[],

  reducers: {
      setTasks: (state, action) => {
            return action.payload;
        },


    addTask: (state, action) => {
      state.push(action.payload);
    },

    updateTask: (state, action) => {
      const { id, name, value } = action.payload;
       console.log("UPDATE PAYLOAD:", action.payload);
        const index = state.findIndex(task => task.id === id);
        if(index!==-1)
        {
          state[index][name] = value;
    }
   },
      

    deleteTask: (state, action) => {
      const id = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state.splice(index, 1);
  }
    },

    
    clearTasks: (state) => {
      return [];
    }
  }
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  clearTasks
} = taskSlice.actions;

export default taskSlice.reducer;
