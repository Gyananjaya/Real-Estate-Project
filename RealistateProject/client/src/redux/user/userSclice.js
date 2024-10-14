import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFaliure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart:(state)=>{
      state.loading=true;
    },
    deleteUserSucess:(state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure:(state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart:(state)=>{
      state.loading=true;
    },
    signOutUserSucess:(state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure:(state,action)=>{
      state.error = action.payload;
      state.loading = false;
    }
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFaliure,
  updateUserStart,
  updateUserSucess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSucess,
  signOutUserFailure,
} = userSlice.actions;
export default userSlice.reducer;