import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",

  initialState: [],

  reducers: {

    // Store tasks fetched from database
    setTodos: (state, action) => {
      return action.payload;
    },

    // Add task to Redux after database POST
    addTodo: (state, action) => {
      state.push(action.payload);
    },

    // Remove completed task from Redux
    deleteTodo: (state, action) => {
      return state.filter(
        (todo) => todo.id !== action.payload
      );
    }

  }
});

export const {
  setTodos,
  addTodo,
  deleteTodo
} = todoSlice.actions;

export default todoSlice.reducer;