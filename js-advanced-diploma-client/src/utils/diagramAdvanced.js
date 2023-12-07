import { historyBalanceDiagram } from "../components/historyBalance/historyBalanceDiagram";

export const diagramAdvanced = (mappedTransactions, containerDiagram) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const historyBalanceId = urlSearchParams.get("historyBalanceId");

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const currentDate = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

  const filteredTransactions = mappedTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate > twelveMonthsAgo;
  });

  const incomeData = {};
  const expenseData = {};

  filteredTransactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const monthKey = `${transactionDate.getFullYear()}-${
      transactionDate.getMonth() + 1
    }`;

    if (!incomeData[monthKey]) {
      incomeData[monthKey] = 0;
    }

    if (!expenseData[monthKey]) {
      expenseData[monthKey] = 0;
    }

    const plus =
      transaction.from !== historyBalanceId ? transaction.amount : null;
    const minus =
      transaction.from === historyBalanceId ? transaction.amount : null;

    if (plus) {
      incomeData[monthKey] += plus;
    } else {
      expenseData[monthKey] += minus;
    }
  });

  // Затем в цикле берем значения из обоих объектов
  const labels = [];
  const dataValuesPlus = [];
  const dataValuesMinus = [];

  for (let i = 11; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - i);
    const monthKey = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }`;
    const monthIndex = parseInt(currentDate.getMonth());

    labels.push(`${monthNames[monthIndex]} ${currentDate.getFullYear()}`);

    const income = incomeData[monthKey] || 0;
    const expense = "-"+expenseData[monthKey] || 0;

    dataValuesPlus.push(income);
    dataValuesMinus.push(expense);
  }
  containerDiagram.append(
    historyBalanceDiagram(labels, dataValuesPlus, dataValuesMinus)
  );
};
