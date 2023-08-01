const basicCategories = () => {
  return [
    { id: 0, name: "main expenses", type: ["expense"] },
    { id: 1, name: "products", type: ["expense"] },
    { id: 2, name: "car", type: ["expense"] },
    { id: 3, name: "self care", type: ["expense"] },
    { id: 4, name: "child care", type: ["expense"] },
    { id: 8, name: "household products", type: ["expense"] },
    { id: 9, name: "education", type: ["expense"] },
    { id: 10, name: "leisure", type: ["expense"] },
    { id: 11, name: "paycheck", type: ["income"] },
    { id: 66, name: "other expenses", type: ["expense"] },
    { id: 94, name: "other incomes", type: ["income"] },
  ];
};

const sumTransactions = ({ transactions, categories, year, month }) => {
  const categorySummary = categories.map((cat) => ({ ...cat._doc, total: 0 }));
  const summary = { income: 0, expense: 0 };

  const specificTransactions = transactions.filter(
    (trans) =>
      new Date(trans.date).getFullYear().toString() === year &&
      new Date(trans.date).getMonth() === month - 1
  );

  specificTransactions.forEach((trans) => {
    const i = categorySummary.findIndex(
      (category) => category.id === trans.categoryId
    );

    categorySummary[i].total += trans.sum;
    summary[trans.type.toLowerCase()] += trans.sum;
  });

  const periodTotal = summary.income - summary.expense;

  return {
    categorySummary,
    incomeSummary: summary.income,
    expenseSummary: summary.expense,
    periodTotal,
    year,
    month,
  };
};

module.exports = {
  basicCategories,
  sumTransactions,
};
