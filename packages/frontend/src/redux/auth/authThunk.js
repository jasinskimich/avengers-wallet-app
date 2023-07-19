import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const apiInstance = axios.create({
  baseURL: "https://main--avengers-wallet-app.netlify.app/",
  timeout: "8000",
  mode: "cors",
});

const setAuthToken = (token) => {
  apiInstance.defaults.headers.common.Authorization = `${token}`;
};

const clearAuthToken = () => {
  apiInstance.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/sign-up",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiInstance.post("/auth/sign-up", credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/sign-in",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiInstance.post("/auth/sign-in", credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk("sign-out", async (_, thunkAPI) => {
  try {
    await apiInstance.delete("/auth/sign-out");
    clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthToken(persistedToken);
      const { data } = await apiInstance.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
