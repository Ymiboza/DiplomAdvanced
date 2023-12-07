import { errorField } from "../icons/icons";
import { transferFunds } from "../network/index";
import { hideSpinnerS, showSpinnerS } from "./spinner";

export const transfer = (allAccounts, currentAccount) => {
  const accountNewTransactionDropdown = document.querySelector(
    ".accountNewTransactionDropdown"
  );
  const accountNewTransactionButton = document.querySelector(
    ".accountNewTransactionButton"
  );
  const accountNewTransactionButtonSpan = document.querySelector(
    ".accountNewTransactionButtonSpan"
  );
  const accountNewTransactionInput = document.querySelector(
    ".accountNewTransactionInput"
  );
  const accountBalanceMoney = document.querySelector(".accountBalanceMoney");

  allAccounts.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.account;
    option.textContent = item.account;
    accountNewTransactionDropdown.append(option);
  });

  accountNewTransactionButton.addEventListener("click", async () => {
    const authDta = JSON.parse(localStorage.getItem("auth"));
    showSpinnerS(accountNewTransactionButton);

    if (!accountNewTransactionInput.value) {
      accountNewTransactionButtonSpan.innerHTML = errorField+"Введите сумму!"
      setTimeout(() => {
        hideSpinnerS(accountNewTransactionButton);
      }, 200);
      return;
    }
    if (accountNewTransactionInput.value <= 0) {
      accountNewTransactionButtonSpan.innerHTML = errorField+"Неправильная сумма!"
      setTimeout(() => {
        hideSpinnerS(accountNewTransactionButton);
      }, 200);
      return;
    }

    const data = await transferFunds(
      authDta.token,
      currentAccount,
      accountNewTransactionDropdown.options[
        accountNewTransactionDropdown.selectedIndex
      ].text,
      accountNewTransactionInput.value
    );

    accountBalanceMoney.textContent = data.payload.balance.toLocaleString(
      "ru-RU",
      {
        style: "currency",
        currency: "RUB",
      }
    );

    if (data.payload === null && !data.error) {
      console.log("error не нашли дату");
      return;
    }

    if (data.error) {
      if (data.error === "Invalid amount") {
        accountNewTransactionButtonSpan.innerHTML = errorField+"Неправильная сумма!"
        return;
      }
      if (data.error === "Overdraft prevented") {
        accountNewTransactionButtonSpan.innerHTML = errorField+"Недостаточно средств!"
        return;
      }
      if (data.error === "Invalid account to") {
        accountNewTransactionButtonSpan.innerHTML = errorField+"Неправильный номер счета получателя!"
        return;
      }
      if (data.error === "Invalid account from") {
        accountNewTransactionButtonSpan.innerHTML = errorField+"Неправильный номер счета отправителя!"
        return;
      }
      console.log("DATA ERROR:", data.error);
    }
    location.reload();
  });
};
