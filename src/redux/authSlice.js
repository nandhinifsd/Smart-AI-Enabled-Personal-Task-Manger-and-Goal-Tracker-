
import { createSlice } from "@reduxjs/toolkit";


const savedUser =JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    //3 parameter rule
    name: "auth",
    initialState:{
        user:savedUser ? savedUser : null,
        isLoggedin: savedUser ? true : false
    },
    reducers:{
        loginState:(state,action)=>{
             console.log("LOGIN ACTION:", action.payload);
            state.user=action.payload;
            state.isLoggedin=true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutState:(state)=>{
            state.user=null;
            state.isLoggedin=false;
            localStorage.removeItem("user");
        }
    }
}) 
export const { loginState,logoutState } = authSlice.actions;
export default authSlice.reducer;
