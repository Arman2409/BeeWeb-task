import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signInThunk = createAsyncThunk(
    'signIn/signInThunk',
     async (user, { fulfillWithValue,rejectWithValue}) => {
        try {
          const api = '/api/signIn'
          const response = await axios.post(api, user);
             return fulfillWithValue(response.data);
        } catch (e) {
            if (!e.response) {
                throw e
              }
              return rejectWithValue(e.response)
        }
     }
);

const signInSlice = createSlice({
    name: "signIn",
    initialState: {
        isAuthenticated:null,
        signInResponse: {},
    },
    reducers: { 
        clearResponse: (state,action) => {
            state.signInResponse = {};
        }
    },
    extraReducers:{
        [signInThunk.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.signInResponse = action.payload;
        },
        [signInThunk.rejected]: (state, action) => {
            state.signInResponse = action.payload;
        },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const {clearResponse} = signInSlice.actions;
export default signInSlice.reducer;