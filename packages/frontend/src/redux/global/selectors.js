export const selectIsAddTransactionModal = (state) =>
  state.global.isModalAddTransaction;
export const selectIsEditTransactionModal = (state) =>
  state.global.isModalEditTransaction;

export const selectIsModalOpen = (state) => state.global.isModalLogoutOpen;
export const selectTransactionToEdit = (state) =>
  state.global.transactionToEdit;
