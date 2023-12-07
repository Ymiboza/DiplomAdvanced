import { backArrow } from "../../icons/icons";
import { showSpinnerS } from "../../utils/spinner";
import { accountTransfer } from "../accounts/accountTransfer";
import { accountTableCreate } from "./accountTable";

export const Account = (
  data,
  { onAccountBack, onAccountDiagram, onAccountHistory }
) => {
  const accountContainer = document.createElement("div");
  const accountHeadContainer = document.createElement("div");
  const accountHeadBlock = document.createElement("div");
  const accountTitle = document.createElement("h1");
  const accountNumber = document.createElement("p");
  const accountFrontBlock = document.createElement("div");
  const accountButtonNew = document.createElement("button");
  const accountBalanceBlock = document.createElement("div");
  const accountBalance = document.createElement("p");
  const accountBalanceMoney = document.createElement("p");
  const accountContentContainer = document.createElement("div");
  const accountFirstContentBlock = document.createElement("div");
  const accountNewTransactionTitle = document.createElement("h2");
  const accountSecondContentBlock = document.createElement("div");
  const accountDiagramTitle = document.createElement("h2");
  const accountDiagram = document.createElement("div");
  const accountTableContainer = document.createElement("div");

  accountContainer.className = "accountContainer";
  accountHeadContainer.className = "accountHeadContainer";
  accountHeadBlock.className = "accountHeadBlock";
  accountTitle.className = "accountTitle";
  accountNumber.className = "accountNumber skeleton";
  accountFrontBlock.className = "accountFrontBlock";
  accountButtonNew.className = "accountButtonNew skeleton";
  accountBalanceBlock.className = "accountBalanceBlock";
  accountBalance.className = "accountBalance";
  accountBalanceMoney.className = "accountBalanceMoney skeleton";
  accountContentContainer.className = "accountContentContainer";
  accountFirstContentBlock.className = "accountFirstContentBlock";
  accountNewTransactionTitle.className = "accountNewTransactionTitle";
  accountSecondContentBlock.className = "accountSecondContentBlock";
  accountDiagramTitle.className = "accountDiagramTitle";
  accountDiagram.className = "accountDiagram";
  accountTableContainer.className = "accountTableContainer";

  accountTitle.textContent = "Просмотр счёта";
  accountNumber.innerHTML = "№ " + data.account;
  accountButtonNew.innerHTML = backArrow + "Вернуться назад";
  accountBalance.innerHTML = "Баланс";
  accountBalanceMoney.innerHTML = data.balance.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  accountNewTransactionTitle.textContent = "Новый перевод";
  accountDiagramTitle.textContent = "Динамика баланса";

  accountButtonNew.addEventListener("click", async () => {
    if (onAccountBack) {
      showSpinnerS(accountButtonNew);
      try {
        await onAccountBack();
      } catch (error) {
        console.error(error);
      }
    }
  });

  accountDiagram.addEventListener("click", () => {
    if (onAccountDiagram) {
      onAccountDiagram();
    }
  });

  accountTableContainer.append(accountTableCreate({ onAccountHistory }));
  accountSecondContentBlock.append(accountDiagramTitle, accountDiagram);
  accountFirstContentBlock.append(
    accountNewTransactionTitle,
    accountTransfer()
  );
  accountContentContainer.append(
    accountFirstContentBlock,
    accountSecondContentBlock
  );
  accountBalanceBlock.append(accountBalance, accountBalanceMoney);
  accountFrontBlock.append(accountButtonNew, accountBalanceBlock);
  accountHeadBlock.append(accountTitle, accountNumber);
  accountHeadContainer.append(accountHeadBlock, accountFrontBlock);
  accountContainer.append(
    accountHeadContainer,
    accountContentContainer,
    accountTableContainer
  );

  return accountContainer;
};
