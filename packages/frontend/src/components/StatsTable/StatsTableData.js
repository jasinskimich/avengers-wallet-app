async function fetchTransactionsData(owner) {
  try {
    const response = await fetch(`http://localhost:5000/api/getfinances/${owner}`, {
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
