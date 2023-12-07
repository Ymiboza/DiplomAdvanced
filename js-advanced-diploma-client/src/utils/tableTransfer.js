export const tableTransfer = async (transactions, currentAccount) => {
  const accountTableBody = document.querySelector(".accountTableBody");
  const accountTableHeadTh1 = document.querySelector(".accountTableHeadTh1");
  const accountTableHeadTh2 = document.querySelector(".accountTableHeadTh2");
  const accountTableHeadTh3 = document.querySelector(".accountTableHeadTh3");
  const accountTableHeadTh4 = document.querySelector(".accountTableHeadTh4");
  accountTableHeadTh1.textContent = "Счет отправителя";
  accountTableHeadTh2.textContent = "Счет получателя";
  accountTableHeadTh3.textContent = "Сумма";
  accountTableHeadTh4.textContent = "Дата";

  accountTableBody.innerHTML = "";

  const last10Transactions = transactions.slice(-10);
  const reversedTransactions = last10Transactions.reverse();

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}.${year}`;
  }

  reversedTransactions.forEach((transaction) => {
    const accountTableBodyRow = document.createElement("tr");
    accountTableBodyRow.className = "accountTableBodyRow";

    const fromCell = document.createElement("td");
    fromCell.className = "fromCell cell skeleton";
    fromCell.textContent = transaction.from;
    accountTableBodyRow.appendChild(fromCell);

    const toCell = document.createElement("td");
    toCell.className = "toCell cell skeleton";
    toCell.textContent = transaction.to;
    accountTableBodyRow.appendChild(toCell);

    const amountCell = document.createElement("td");
    amountCell.className = "amountCell cell skeleton";
    accountTableBodyRow.appendChild(amountCell);

    const dateCell = document.createElement("td");
    dateCell.className = "dateCell cell skeleton";
    dateCell.textContent = formatDate(transaction.date);
    accountTableBodyRow.appendChild(dateCell);

    if (fromCell.textContent === currentAccount) {
      amountCell.style.color = "var(--error)";
      amountCell.textContent =
        "- " +
        transaction.amount.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
        });
    } else {
      amountCell.style.color = "var(--success)";
      amountCell.textContent =
        "+ " +
        transaction.amount.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
        });
    }

    accountTableBody.append(accountTableBodyRow);
  });
};
