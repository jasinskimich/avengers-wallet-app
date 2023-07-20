import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currencyInstance = axios.create({
  baseURL: "https://api.nbp.pl/api/.",
  timeout: 8000,
  mode: "cors",
});

export const getCurrency = createAsyncThunk("currency", async (_, thunkAPI) => {
  try {
    const response = await currencyInstance.get(`/exchangerates/tables/c/`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
