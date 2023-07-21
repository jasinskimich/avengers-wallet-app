import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, fetchCurrentUser } from "./authThunk";

const initialState = {
  token: null,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = false;
    },
    [register.rejected](state, { payload }) {
      state.error = payload;
    },
    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logIn.rejected](state, { payload }) {
      state.error = payload;
    },
    [logOut.fulfilled](state) {
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
    [logOut.rejected](state, { payload }) {
      state.error = payload;
    },
    [fetchCurrentUser.pending](state) {
      state.isRefreshing = true;
    },
    [fetchCurrentUser.fulfilled](state, { payload }) {
      state.message = payload.messaage;
      state.user = payload.user;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    [fetchCurrentUser.rejected](state) {
      state.isRefreshing = false;
      state.isLoggedIn = false;
    },
  },
});

export const authReducer = authSlice.reducer;
