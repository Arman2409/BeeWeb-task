import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImageThunk = createAsyncThunk(
    "user/uploadImage",
    async (userData, { fulfillWithValue,rejectWithValue}) => {
        try {
          const api = '/api/uploadUserImage'
          const response = await axios.post(api,userData,{ headers: {   
            'Content-Type': 'application/x-www-form-urlencoded'
          }});
          console.log(response.data);
          return fulfillWithValue(response.data);
        } catch (e) {
         if (!e.response) {
           throw e
         }
           return rejectWithValue(e.response)
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
       setUser: (state, action) => {
           state.user = action.payload;
       }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;