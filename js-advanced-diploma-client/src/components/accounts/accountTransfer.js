import { postIcon } from "../../icons/icons";

export const accountTransfer = () => {
  const accountNewTransactionContainer = document.createElement("div");
  const accountNewTransactionNumberContainer = document.createElement("div");
  const accountNewTransactionNumber = document.createElement("span");
  const accountNewTransactionDropdown = document.createElement("select");
  const accountNewTransactionDropdownPlaceholder =
    document.createElement("option");
  const accountNewTransactionSumContainer = document.createElement("div");
  const accountNewTransactionSum = document.createElement("span");
  const accountNewTransactionInput = document.createElement("input");
  const accountNewTransactionButtonBlock = document.createElement("div");
  const accountNewTransactionButton = document.createElement("button");
  const accountNewTransactionButtonSpan = document.createElement("span");

  accountNewTransactionContainer.className = "accountNewTransactionContainer";
  accountNewTransactionNumberContainer.className =
    "accountNewTransactionNumberContainer";
  accountNewTransactionNumber.className = "accountNewTransactionNumber";
  accountNewTransactionDropdown.className =
    "accountNewTransactionDropdown skeleton";
  accountNewTransactionDropdownPlaceholder.className =
    "accountNewTransactionDropdownPlaceholder";
  accountNewTransactionSumContainer.className =
    "accountNewTransactionSumContainer";
  accountNewTransactionSum.className = "accountNewTransactionSum";
  accountNewTransactionInput.className = "accountNewTransactionInput skeleton";
  accountNewTransactionButtonBlock.className =
    "accountNewTransactionButtonBlock";
  accountNewTransactionButton.className =
    "accountNewTransactionButton skeleton";
  accountNewTransactionButtonSpan.className = "accountNewTransactionButtonSpan";

  accountNewTransactionNumber.innerHTML = "Номер счета получателя";
  accountNewTransactionDropdown.placeholder = "Сортировка";
  accountNewTransactionDropdownPlaceholder.value = "";
  accountNewTransactionDropdownPlaceholder.text = "Счета";
  accountNewTransactionDropdownPlaceholder.disabled = true;
  accountNewTransactionDropdownPlaceholder.selected = true;
  accountNewTransactionDropdownPlaceholder.hidden = true;
  accountNewTransactionSum.innerHTML = "Сумма перевода";

  accountNewTransactionButton.innerHTML = postIcon + "Отправить";

  window.addEventListener("load",()=> {
    setTimeout(() => {
      if (accountNewTransactionInput.classList.contains("skeleton")) {
        accountNewTransactionInput.placeholder = "";
      } else {
        accountNewTransactionInput.placeholder = "Введите сумму";
      }
    }, 605);
  })

  accountNewTransactionDropdown.append(
    accountNewTransactionDropdownPlaceholder
  );
  accountNewTransactionSumContainer.append(
    accountNewTransactionSum,
    accountNewTransactionInput
  );
  accountNewTransactionNumberContainer.append(
    accountNewTransactionNumber,
    accountNewTransactionDropdown
  );
  accountNewTransactionButtonBlock.append(
    accountNewTransactionButton,
    accountNewTransactionButtonSpan
  );
  accountNewTransactionContainer.append(
    accountNewTransactionNumberContainer,
    accountNewTransactionSumContainer,
    accountNewTransactionButtonBlock
  );

  return accountNewTransactionContainer;
};
