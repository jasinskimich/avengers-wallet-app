import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  signout,
  refreshTokens,
  currentUser,
} from "./authThunk";

const initialState = {
  user: { id: null, firstName: null, email: null, wallets: [] },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });
    builder
      .addCase(signout.fulfilled, (state) => {
        state.user = { id: null, name: null, email: null, wallets: [] };
        state.accessToken = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, (state) => {
        state.user = { id: null, name: null, email: null, wallets: [] };
        state.accessToken = null;
        state.isLoggedIn = false;
      });
    builder
      .addCase(refreshTokens.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken; // sprawdzić czy to potrzebne?
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshTokens.rejected, (state) => {
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
    builder
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(currentUser.rejected, (state) => {
        state.user = { id: null, name: null, email: null };
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer;
