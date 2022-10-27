import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signUpThunk = createAsyncThunk(
    'signIn/signInThunk',
     async (user, { fulfillWithValue,rejectWithValue}) => {
        try {
          const api = '/api/signUp'
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

const signUpSlice = createSlice({
    name: "signUp",
    initialState: {
        signUpResponse: {},
    },
    reducers: { 
        clearResponse: (state,action) => {
            state.signUpResponse = null;
        }
    },
    extraReducers:{
    [signUpThunk.fulfilled]: (state, action) => {
        state.signUpResponse = action.payload
    },
    [signUpThunk.rejected]: (state, action) => {
        console.log(action.payload);
        state.signUpResponse = action.payload;
    }
    }
})

export const {clearResponse, clearUser} = signUpSlice.actions;
export default signUpSlice.reducer;