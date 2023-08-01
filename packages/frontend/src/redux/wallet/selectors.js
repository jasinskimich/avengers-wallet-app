export const selectId = (state) => state.wallet.id;

export const selectBalance = (state) => state.wallet.balance;

export const selectTransactions = (state) => state.wallet.transactions;

export const selectCategories = (state) => state.wallet.categories;

export const selectSummary = (state) => state.wallet.summary;

export const selectChangeTransactions = (state) =>
  state.wallet.changeTransactions;
