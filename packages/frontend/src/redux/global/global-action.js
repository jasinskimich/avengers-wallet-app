import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalLogoutOpen: false,
  modalType: null,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
  transactionToEdit: [],
};

export const resetState = createAction("global/resetState");

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openModalLogout(state) {
      state.isModalLogoutOpen = !state.isModalLogoutOpen;
    },
    closeModalLogout(state) {
      state.isModalLogoutOpen = !state.isModalLogoutOpen;
    },
    setModalType(state, action) {
      state.modalType = action.payload;
    },
    toggleModalAddTransaction(state) {
      state.isModalAddTransactionOpen = !state.isModalAddTransactionOpen;
    },
    toggleModalEditTransaction(state) {
      state.isModalEditTransactionOpen = !state.isModalEditTransactionOpen;
    },
    setTransactionToEdit(state, action) {
      state.transactionToEdit = action.payload;
    },
  },
});

export const {
  openModalLogout,
  closeModalLogout,
  toggleModalAddTransaction,
  toggleModalEditTransaction,
  setTransactionToEdit,
} = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
