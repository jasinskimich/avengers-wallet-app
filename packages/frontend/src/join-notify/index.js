import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySettings = () => {
  return {
    position: "top-right",
    hideProgressBar: true,
    closeButton: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: "light",
  };
};

export const notifyError = (message) => {
  return {
    type: toast.TYPE.ERROR,
    render: message,
    autoClose: 2000,
  };
};

export const notifySuccess = (message) => {
  return {
    type: toast.TYPE.SUCCESS,
    render: message,
    autoClose: 3000,
  };
};

export const notifyMessages = {
  registerProgress: "Registration in progress",
  registerSuccess: "User registered",
  registerError: "Validation error",
  registerExist: "User with such email already exist",

  loginProgress: "Login in progress",
  loginSuccess: "User logged in",
  loginError: "Wrong email or password",
  loginVerify: "User not verified",

  logoutProgress: "Logout in progress",
  logoutSuccess: "User logged out",

  transactionsLoad: "Transactions loading",
  transactionsLoadSuccess: "Transactions loaded",
  transactionsLoadError: "Transactions not loaded",

  transactionProgress: "Transaction action in progress",
  transactionAdd: "Transaction created",
  transactionDelete: "Transaction deleted",
  transactionUpdate: "Transaction updated",
  transactionAddError: "Transaction not created",
  transactionDeleteError: "Transaction not deleted",
  transactionUpdateError: "Transaction not updated",
  transactionNotFound: "Transaction not exist",
  transactionValid: "Transaction data is not valid",

  summaryProgress: "Transaction summary in progress",
  summarySuccess: "Transaction summary returned",
  summaryError: "Transaction summary not calculated",

  unauthorized: "User not authorized",
};
