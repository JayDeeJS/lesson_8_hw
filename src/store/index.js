import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

const reducer = combineReducers({
    usersReducer
})

export const store = configureStore({
    reducer
})