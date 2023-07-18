export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectName = (state) => state.auth.username;

export const selectId = (state) => state.auth.user._id;

export const getAuthRefresh = (state) => state.auth.isAuthRefresh;

export const selectIsAuth = (state) => state.auth.isAuth;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectIsFetchingCurrentUser = (state) =>
  state.auth.isFetchingCurrentUser;

export const selectError = (state) => state.auth.error;

export const getUsername = (state) => state.auth.user.name;

export const getLoading = (state) => state.auth.isLoading;

export const getBalance = (state) => state.auth.user.balance;

export const getCategories = (state) => state.auth.user;

export const getTransactionsUser = (state) => state.auth.user.transactions;

export const addTransactionsUser = (state) => state.auth.user.transactions;

export const getUserEmail = (state) => state.auth.user.email;

export const getIsRegistered = (state) => state.auth.isRegistered;
