import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("auth")) || undefined,
  error: false,
  logging: false,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.logging = true;
      state.error = false;
    },
    loginSuccess(state, action) {
      state.logging = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.error = false;
    },
    loginFailed(state, action) {
      state.logging = false;
      state.error = true;
    },

    logout(state) {
      state.logging = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { login, loginSuccess, loginFailed, logout, FOLLOW, UNFOLLOW } =
  authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
