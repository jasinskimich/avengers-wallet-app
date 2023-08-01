export const selectShowAddTransaction = (state) =>
  state.modal.showAddTransaction;

export const selectShowEditTransaction = (state) =>
  state.modal.showEditTransaction;

export const selectShowLogout = (state) => state.modal.showLogout;

export const selectShowSuccessLogout = (state) => state.modal.showSuccessLogout;

export const selectShowSuccessRegistration = (state) =>
  state.modal.showSuccessRegistration;

export const selectModalTransaction = (state) => state.modal.modalTransaction;
