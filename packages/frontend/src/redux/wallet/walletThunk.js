import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  notifySettings,
  notifyError,
  notifySuccess,
  notifyMessages,
} from "../../join-notify/index";
import "react-toastify/dist/ReactToastify.css";
import SpinnerToastify  from "../../components/Spinner/CircularIndeterminate";


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

export const addTransaction = createAsyncThunk(
  "wallet/addTransactions",
  async ({ walletId, transaction }, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <SpinnerToastify message={notifyMessages.transactionProgress} />,
        notifySettings()
      );
      console.log(transaction);
      const response = await axios.post(`wallet/${walletId}/transactions`, {
        ...transaction,
        categoryId: transaction.categoryId.toString(),
      });
      toast.update(notify, notifySuccess(notifyMessages.transactionAdd));
      return response.data;
    } catch (error) {
      toast.update(notify, notifyError(notifyMessages.registerError));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "wallet/getTransactions",
  async ({ walletId }, thunkAPI) => {
    try {
      const response = await axios.get(`wallet/${walletId}/transactions`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "wallet/editTransaction",
  async ({ walletId, transaction, transactionId }, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <SpinnerToastify message={notifyMessages.transactionProgress} />,
        notifySettings()
      );
      const response = await axios.patch(
        `wallet/${walletId}/transactions/${transactionId}`,
        transaction
      );
      console.log(response.data);
      toast.update(notify, notifySuccess(notifyMessages.transactionUpdate));
      return response.data;
    } catch (error) {
      toast.update(notify, notifyError(notifyMessages.transactionUpdateError));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "wallet/deleteTransaction",
  async ({ walletId, transactionId }, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <SpinnerToastify message={notifyMessages.transactionProgress} />,
        notifySettings()
      );
      const response = await axios.delete(
        `wallet/${walletId}/transactions/${transactionId}`
      );
      toast.update(notify, notifySuccess(notifyMessages.transactionDelete));
      return response.data;
    } catch (error) {
      toast.update(notify, notifyError(notifyMessages.transactionDeleteError));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "wallet/getCategories",
  async ({ walletId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `wallet/${walletId}/transaction-categories`
      );
      return response.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);