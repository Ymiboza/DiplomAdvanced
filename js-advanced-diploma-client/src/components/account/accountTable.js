export const accountTableCreate = ({ onAccountHistory }) => {
  const accountTableContainer = document.createElement("div");
  const accountTableTitle = document.createElement("h3");
  const accountTable = document.createElement("table");
  const accountTableHead = document.createElement("thead");
  const accountTableHeadRow = document.createElement("tr");
  const accountTableBody = document.createElement("tbody");

  accountTableContainer.className = "accountTableContainer";
  accountTableTitle.className = "accountTableTitle";
  accountTable.className = "accountTable";
  accountTableHead.className = "accountTableHead";
  accountTableHeadRow.className = "accountTableHeadRow";
  accountTableBody.className = "accountTableBody";

  accountTableTitle.innerHTML = "История переводов";

  for (let j = 1; j <= 4; j++) {
    const accountTableHeadTh = document.createElement("th");
    accountTableHeadTh.className = `accountTableHeadTh${j}`;
    accountTableHeadRow.append(accountTableHeadTh);
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const accountId = urlSearchParams.get("accountId");

  if (accountId) {
    setTimeout(() => {
      const accountTableBodyRow = document.querySelectorAll(
        ".accountTableBodyRow"
      );
      accountTableBodyRow.forEach(row => {
        row.addEventListener("click", () => {
          if (onAccountHistory) onAccountHistory();
        });
      });
    }, 110);
  }

  accountTableHead.append(accountTableHeadRow);
  accountTable.append(accountTableHead, accountTableBody);
  accountTableContainer.append(accountTableTitle, accountTable);

  return accountTableContainer;
};
