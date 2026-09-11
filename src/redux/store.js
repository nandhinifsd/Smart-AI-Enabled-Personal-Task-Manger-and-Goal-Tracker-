import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import todoReducer from "./todoSlice";
const store=configureStore({
    reducer: {
        auth:authReducer,
        tasks:taskReducer,
        todos: todoReducer
    },

});
export default store;