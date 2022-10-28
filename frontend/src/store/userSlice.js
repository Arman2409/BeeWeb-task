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
          return fulfillWithValue(response.data);
        } catch (e) {
         if (!e.response) {
           throw e
         }
           return rejectWithValue(e.response)
    }
});

export const getUserImageThunk = createAsyncThunk(
  "user/getUserImage",
  async (file, { fulfillWithValue,rejectWithValue}) => {
      try {
        const api = `/api/getUserImage`
        const response = await axios.post(api, {token: file.token, filename: file.filename});
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
        uploadInfo: {},
        userImage: null,
    },
    reducers: {
       clearUploadInfo: (state, action) => {
         state.uploadInfo = {};
       },
       clearUserImage: (state, action) => {
        state.userImage = "";
      },
    },
    extraReducers:{
      [uploadImageThunk.fulfilled]: (state, action) => {
        state.uploadInfo = action.payload
      },
      [uploadImageThunk.rejected]: (state, action) => {
        console.log(action.payload);
        state.uploadInfo = action.payload;
      },
      [getUserImageThunk.fulfilled]: (state, action) => {
        state.userImage = action.payload
      },
      [getUserImageThunk.rejected]: (state, action) => {
        console.log(action.payload);
        state.userImage = action.payload;
      }
    }
});

export const { clearUploadInfo, clearUserImage } = userSlice.actions;
export default userSlice.reducer;