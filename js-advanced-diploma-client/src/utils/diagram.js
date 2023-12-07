import { accountDiagramChart } from "../components/account/accountDiagram";

export const diagram = (mappedTransactions, containerDiagram) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const accountId = urlSearchParams.get("accountId");
  const historyBalanceId = urlSearchParams.get("historyBalanceId");

  if (accountId) {
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
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    const filteredTransactions = mappedTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate > sixMonthsAgo;
    });

    const monthlySum = {};

    filteredTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const monthKey = `${transactionDate.getFullYear()}-${
        transactionDate.getMonth() + 1
      }`;

      if (!monthlySum[monthKey]) {
        monthlySum[monthKey] = 0;
      }

      monthlySum[monthKey] += transaction.from !== accountId ? transaction.amount : null;
    });

    const labels = [];
    const dataValues = [];

    for (let i = 5; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - i);
      const monthKey = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }`;
      const monthIndex = parseInt(currentDate.getMonth());

      labels.push(`${monthNames[monthIndex]} ${currentDate.getFullYear()}`);
      dataValues.push(monthlySum[monthKey] || 0);
    }

    containerDiagram.append(accountDiagramChart(labels, dataValues));
  }

  if (historyBalanceId) {
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

    const monthlySum = {};

    filteredTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const monthKey = `${transactionDate.getFullYear()}-${
        transactionDate.getMonth() + 1
      }`;

      if (!monthlySum[monthKey]) {
        monthlySum[monthKey] = 0;
      }

      monthlySum[monthKey] += transaction.from !== historyBalanceId ? transaction.amount : null;
    });

    const monthKeys = Object.keys(monthlySum);
    const labels = [];
    const dataValues = [];

    for (let i = 11; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - i);
      const monthKey = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }`;
      const monthIndex = parseInt(currentDate.getMonth());

      labels.push(`${monthNames[monthIndex]} ${currentDate.getFullYear()}`);
      dataValues.push(monthlySum[monthKey] || 0);
    }

    containerDiagram.append(accountDiagramChart(labels, dataValues));
  }
};
