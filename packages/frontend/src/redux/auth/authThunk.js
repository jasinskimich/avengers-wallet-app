import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  notifySettings,
  notifyError,
  notifySuccess,
  notifyMessages,
} from '../../join-notify/index';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../components/Spinner/CircularIndeterminate";

// axios.defaults.baseURL = 'https://main--avengers-wallet-app.netlify.app/api';
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const STORAGE_ACCESS_TOKEN = 'accessToken';

axios.interceptors.request.use(
  config => {
    config.headers = {
      Authorization:
        'Bearer ' + JSON.parse(localStorage.getItem(STORAGE_ACCESS_TOKEN)),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const setToken = token => {
  localStorage.setItem(STORAGE_ACCESS_TOKEN, JSON.stringify(token));
};

export const signup = createAsyncThunk(
  'auth/sign-up',
  async (credentials, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <Spinner message={notifyMessages.registerProgress} />,
        notifySettings()
      );
      const response = await axios.post('auth/sign-up', credentials);
      toast.update(notify, notifySuccess(notifyMessages.registerSuccess));
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (error.request.status === 400) {
        toast.update(notify, notifyError(notifyMessages.registerError));
      }
      if (error.request.status === 409) {
        toast.update(notify, notifyError(notifyMessages.registerExist));
      }
      toast.update(notify, { autoClose: 0 });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/sign-in',
  async (credentials, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <Spinner message={notifyMessages.loginProgress} />,
        notifySettings()
      );
      const response = await axios.post('auth/sign-in', credentials);
      toast.update(notify, notifySuccess(notifyMessages.loginSuccess));
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (error.request.status === 404 || 400) {
        toast.update(notify, notifyError(notifyMessages.loginError));
      }
      toast.update(notify, { autoClose: 0 });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signout = createAsyncThunk(
  'auth/sign-out',
  async (_, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <Spinner message={notifyMessages.logoutProgress} />,
        notifySettings()
      );
      const response = await axios.get('auth/sign-out');
      toast.update(notify, notifySuccess(notifyMessages.logoutSuccess));
      setToken('');
      return response;
    } catch (error) {
      toast.update(notify, { autoClose: 0 });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshTokens = createAsyncThunk(
  'auth/refresh-tokens',
  async (_, thunkAPI) => {
    let notify;
    try {
      notify = toast(
        <Spinner message={notifyMessages.refreshTokens} />,
        notifySettings()
      );
      toast.update(notify, notifySuccess(notifyMessages.loginProgress));
      const response = await axios.get('auth/refresh-tokens');
      setToken(response.data.accessToken);
      toast.update(notify, notifySuccess(notifyMessages.loginSuccess));
      return response.data;
    } catch (error) {
      toast.update(notify, notifySuccess(notifyMessages.loginError));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendVerification = createAsyncThunk(
  'auth/verify',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/auth/verify', credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


