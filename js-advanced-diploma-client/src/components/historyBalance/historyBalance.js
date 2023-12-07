import { backArrow } from "../../icons/icons";
import { showSpinnerS } from "../../utils/spinner";
import { accountTableCreate } from "../account/accountTable";

export const HistoryBalance = (data, { onHistoryBalanceBack }) => {
  const historyBalanceContainer = document.createElement("div");
  const historyBalanceHeadContainer = document.createElement("div");
  const historyBalanceHeadBlock = document.createElement("div");
  const historyBalanceTitle = document.createElement("h1");
  const historyBalanceNumber = document.createElement("p");
  const historyBalanceFrontBlock = document.createElement("div");
  const historyBalanceButtonNew = document.createElement("button");
  const historyBalanceBalanceBlock = document.createElement("div");
  const historyBalanceBalance = document.createElement("p");
  const historyBalanceBalanceMoney = document.createElement("p");
  const historyBalanceContentContainer = document.createElement("div");
  const historyBalanceFirstContentBlock = document.createElement("div");
  const historyBalanceDiagramTitle = document.createElement("h2");
  const historyBalanceDiagram = document.createElement("div");
  const historyBalanceSecondContentBlock = document.createElement("div");
  const historyBalanceAnotherDiagramTitle = document.createElement("h2");
  const historyBalanceAnotherDiagram = document.createElement("div");
  const historyBalanceTableContainer = document.createElement("div");

  historyBalanceContainer.className = "historyBalanceContainer";
  historyBalanceHeadContainer.className = "historyBalanceHeadContainer";
  historyBalanceHeadBlock.className = "historyBalanceHeadBlock";
  historyBalanceTitle.className = "historyBalanceTitle";
  historyBalanceNumber.className = "historyBalanceNumber skeleton";
  historyBalanceFrontBlock.className = "historyBalanceFrontBlock";
  historyBalanceButtonNew.className = "historyBalanceButtonNew skeleton";
  historyBalanceBalanceBlock.className = "historyBalanceBalanceBlock";
  historyBalanceBalance.className = "historyBalanceBalance";
  historyBalanceContentContainer.className = "historyBalanceContentContainer";
  historyBalanceFirstContentBlock.className = "historyBalanceFirstContentBlock";
  historyBalanceDiagramTitle.className = "historyBalanceDiagramTitle";
  historyBalanceDiagram.className = "historyBalanceDiagram";
  historyBalanceBalanceMoney.className = "historyBalanceBalanceMoney skeleton";
  historyBalanceSecondContentBlock.className =
    "historyBalanceSecondContentBlock";
  historyBalanceAnotherDiagramTitle.className =
    "historyBalanceAnotherDiagramTitle";
  historyBalanceAnotherDiagram.className = "historyBalanceAnotherDiagram";
  historyBalanceTableContainer.className = "historyBalanceTableContainer";

  historyBalanceTitle.textContent = "История баланса";
  historyBalanceNumber.textContent = "№ " + data.account;
  historyBalanceButtonNew.innerHTML = backArrow + "Вернуться назад";
  historyBalanceBalance.innerHTML = "Баланс";
  historyBalanceBalanceMoney.innerHTML = data.balance.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  historyBalanceDiagramTitle.textContent = "Динамика баланса";
  historyBalanceAnotherDiagramTitle.textContent =
    "Соотношение входящих исходящих транзакций";

  historyBalanceButtonNew.addEventListener("click", async () => {
    if (onHistoryBalanceBack) {
      showSpinnerS(historyBalanceButtonNew);
      try {
        await onHistoryBalanceBack(data.account);
      } catch (error) {
        console.error(error);
      }
    }
  });

  historyBalanceTableContainer.append(accountTableCreate(onHistoryBalanceBack));
  historyBalanceSecondContentBlock.append(
    historyBalanceAnotherDiagramTitle,
    historyBalanceAnotherDiagram
  );
  historyBalanceFirstContentBlock.append(
    historyBalanceDiagramTitle,
    historyBalanceDiagram
  );
  historyBalanceContentContainer.append(
    historyBalanceFirstContentBlock,
    historyBalanceSecondContentBlock
  );
  historyBalanceBalanceBlock.append(
    historyBalanceBalance,
    historyBalanceBalanceMoney
  );
  historyBalanceFrontBlock.append(
    historyBalanceButtonNew,
    historyBalanceBalanceBlock
  );
  historyBalanceHeadBlock.append(historyBalanceTitle, historyBalanceNumber);
  historyBalanceHeadContainer.append(
    historyBalanceHeadBlock,
    historyBalanceFrontBlock
  );
  historyBalanceContainer.append(
    historyBalanceHeadContainer,
    historyBalanceContentContainer,
    historyBalanceTableContainer
  );

  return historyBalanceContainer;
};
