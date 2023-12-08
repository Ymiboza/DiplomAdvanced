import { thrashFull } from "../../icons/icons";
import { showSpinnerS } from "../../utils/spinner";
import { Account } from "../account/account";
import { modalDelete } from "../modal/modalDelete";

export const accountsCard = (data, { onAccounts, onDeleteAccount }) => {
  const accountsCard = document.createElement("div");
  const accountsCardTextContent = document.createElement("div");
  const accountsCardTitleBlock = document.createElement("div");
  const accountsCardTitle = document.createElement("h2");
  const accountsCardThrashFullIcon = document.createElement("div");
  const accountsCardMoney = document.createElement("span");
  const accountsCardTransactionBlock = document.createElement("div");
  const accountsCardTransaction = document.createElement("p");
  const accountsCardDate = document.createElement("span");
  const accountsCardButton = document.createElement("button");
  const dollarUSLocale = Intl.NumberFormat("en-US");

  accountsCard.className = "accountsCard";
  accountsCardTextContent.className = "accountsCardTextContent";
  accountsCardTitleBlock.className = "accountsCardTitleBlock";
  accountsCardTitle.className = "accountsCardTitle skeleton";
  accountsCardThrashFullIcon.className = "accountsCardThrashFullIcon";
  accountsCardThrashFullIcon.id = "thrashFull";
  accountsCardMoney.className = "accountsCardMoney skeleton";
  accountsCardTransactionBlock.className = "accountsCardTransactionBlock";
  accountsCardTransaction.className = "accountsCardTransaction skeleton";
  accountsCardDate.className = "accountsCardDate skeleton";
  accountsCardButton.className = "accountsCardButton skeleton";
  accountsCardTitle.id = "skeleton"
  accountsCardMoney.id = "skeleton"
  accountsCardTransaction.id = "skeleton"
  accountsCardDate.id = "skeleton"
  accountsCardButton.id ="skeleton"

  accountsCardTitle.textContent = data.account;
  accountsCardThrashFullIcon.innerHTML = thrashFull;
  accountsCardMoney.textContent =
    dollarUSLocale.format(data.balance).replace(/,/g, " ") + " ₽";
  accountsCardTransaction.innerHTML = "Последняя транзакция:";
  accountsCardButton.textContent = "Открыть";

  if (data.account === "74213041477477406320783754")   accountsCardThrashFullIcon.innerHTML = "";

  if (data.transactions.length) {
    const transactionDate = new Date(data.transactions[0].date)
      .toLocaleString("ru", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .replace("г.", "");

    accountsCardDate.textContent = transactionDate;
  } else {
    accountsCardDate.textContent = "Нет транзакций";
  }

  accountsCardThrashFullIcon.addEventListener("click", async () => {
    modalDelete(data, { accountsCard, onDeleteAccount });
  });

  accountsCardButton.addEventListener("click", async () => {
    if (Account(data, {})) {
      localStorage.setItem(
        "account",
        JSON.stringify({ accountPage: true, account: data.account })
      );
      if (onAccounts) {
        showSpinnerS(accountsCardButton);
        try {
          await onAccounts(data.account);
        } catch (error) {
          console.error(error);
        }
      }
    }
  });



  accountsCardTransactionBlock.append(
    accountsCardTransaction,
    accountsCardDate
  );
  accountsCardTextContent.append(
    accountsCardTransactionBlock,
    accountsCardButton
  );
  accountsCardTitleBlock.append(accountsCardTitle, accountsCardThrashFullIcon);
  accountsCard.append(
    accountsCardTitleBlock,
    accountsCardMoney,
    accountsCardTextContent
  );
  return accountsCard;
};
