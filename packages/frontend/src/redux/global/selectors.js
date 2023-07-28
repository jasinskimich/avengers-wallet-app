export const selectIsAddTransactionModalopen = (state) =>
  state.global.isModalAddTransactionOpen;
export const selectIsEditTransactionModalOpen = (state) =>
  state.global.isModalEditTransactionOpen;

export const selectIsModalOpen = (state) => state.global.isModalLogoutOpen;
export const selectTransactionToEdit = (state) =>
  state.global.transactionToEdit;
