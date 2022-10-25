import {configureStore} from "@reduxjs/toolkit";
import signInSlice from "./signInSlice";

const reducers = {
    signIn: signInSlice
};

const store = configureStore({reducer: reducers});

export default store;