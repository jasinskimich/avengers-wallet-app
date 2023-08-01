import { createAsyncThunk } from "@reduxjs/toolkit";

export const modalShowAddTransaction = createAsyncThunk(
  "modal/addTransaction",
  async (boolean, thunkAPI) => {
    try {
      return boolean;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modalShowEditTransaction = createAsyncThunk(
  "modal/editTransaction",
  async (boolean, thunkAPI) => {
    try {
      return boolean;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modalShowLogout = createAsyncThunk(
  "modal/logout",
  async (boolean, thunkAPI) => {
    try {
      return boolean;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modalShowSuccessLogout = createAsyncThunk(
  "modal/successLogout",
  async (boolean, thunkAPI) => {
    try {
      return boolean;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modalShowSuccessRegistration = createAsyncThunk(
  "modal/successRegistration",
  async (boolean, thunkAPI) => {
    try {
      return boolean;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const modalSpliceTransaction = createAsyncThunk(
  "modal/modalTransaction",
  async (transaction, thunkAPI) => {
    try {
      return transaction;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
