async function fetchTransactionsData(owner) {
  try {
    const response = await fetch(`https://avengers-wallet-app.onrender.com/api/getfinances/${owner}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const userData = data.data.transactions;
    return userData;
  } catch (err) {
    return Error("Failed to fetch transactions", err);
  }
}

export default fetchTransactionsData;
