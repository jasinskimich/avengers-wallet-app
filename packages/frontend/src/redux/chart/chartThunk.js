import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const STORAGE_ACCESS_TOKEN = "accessToken";

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem(STORAGE_ACCESS_TOKEN)),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const changeMonth = createAsyncThunk(
  "chart/changeMonth",
  async (month, thunkAPI) => {
    try {
      return month.toString();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeYear = createAsyncThunk(
  "chart/changeYear",
  async (year, thunkAPI) => {
    try {
      return year.toString();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const transactionsSummary = createAsyncThunk(
  "chart/transactionsSummary",
  async ({ walletId, year, month }, thunkAPI) => {
    try {
      const response = await axios.get(
        `wallet/${walletId}/transactions-summary?year=${year}&month=${
          +month + 1
        }`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);