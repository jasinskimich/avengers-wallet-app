export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectorEmail = (state) => state.auth.user?.email;

export const selectAccessToken = (state) => state.auth.accessToken;
