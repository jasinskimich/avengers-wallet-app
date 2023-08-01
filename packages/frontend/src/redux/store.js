import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { currencyReducer } from "./currency/currencySlice";
import { modalReducer } from "./modal/modalSlice";
import { walletReducer } from "./wallet/walletSlice";
import { chartReducer } from "./chart/chartSlice.js";


const persistToken = {
  key: "auth",
  storage,
  whitelist: ["token"],
  version: 1,
};

const persistCurrency = {
  key: "currency",
  storage,
  whitelist: ["currencies"],
  version: 1,
};


export const store = configureStore({
  reducer: {
    auth: persistReducer(persistToken, authReducer),
    currency: persistReducer(persistCurrency, currencyReducer),
    modal: modalReducer,
    wallet: walletReducer,
    chart: chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
