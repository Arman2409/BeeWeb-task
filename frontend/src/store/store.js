import {configureStore} from "@reduxjs/toolkit";

import signInSlice from "./signInSlice";
import signUpSlice from "./signUpSlice";
import userSlice from "./userSlice";

const reducers = {
    signIn: signInSlice,
    signUp: signUpSlice,
    user: userSlice,
};

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;