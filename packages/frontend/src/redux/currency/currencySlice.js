import { createSlice } from "@reduxjs/toolkit";
import { getCurrency } from "./currencyThunk";

const initialState = { error: "null", currencies: [] };

const currencySlice = createSlice({
  name: "currency",
  initialState,
  extraReducers: {
    [getCurrency.pending](state, payload) {
      state.error = null;
    },
    [getCurrency.fulfilled](state, { payload }) {
      state.currencies = payload[0].rates;
    },
    [getCurrency.rejected](state, payload) {
      state.error = payload;
    },
  },
});

export const currencyReducer = currencySlice.reducer;
