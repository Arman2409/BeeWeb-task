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

// export const authenticateThunk = createAsyncThunk(
//     'signIn/authenticateThunk',
//     async (_, { fulfillWithValue,rejectWithValue}) => {
//        try {
//          const api = '/api/isAuthenticated';
//          const response = await axios.get(api);
//             return fulfillWithValue(response.data);
//        } catch (e) {
//              return rejectWithValue(e.message);
//        }
//     }
// );

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
    // [authenticateThunk.fulfilled]: (state, action) => {
    //     const isAuth = Boolean(action.payload.email);
    //    if (!isAuth) {
    //       state.user = {};
    //    } else {
    //       state.user = action.payload;
    //    }
    // },
    // [authenticateThunk.rejected]: (state, action) => {
    //     console.error(action.payload.message);
    //  },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const {clearResponse} = signInSlice.actions;
export default signInSlice.reducer;