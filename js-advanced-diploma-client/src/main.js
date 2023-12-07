import page from "page";
import { validationLogin } from "./utils/validation";
import { Account } from "./components/account/account";
import { Accounts } from "./components/accounts/accounts";
import { Currency } from "./components/currency/currency";
import { Header } from "./components/header/header";
import { HistoryBalance } from "./components/historyBalance/historyBalance";
import { Login } from "./components/login/login";
import { Map } from "./components/map/map";
import {
  deleteAccount,
  getAccount,
  getAccountsByToken,
  getCurrencies,
} from "./network";
import { currencyExchangeTransfer } from "./utils/currencyExchangeTransfer";
import { diagram } from "./utils/diagram";
import { diagramAdvanced } from "./utils/diagramAdvanced";
import { tableTransfer } from "./utils/tableTransfer";
import { transfer } from "./utils/transfer";
import { authUser } from "./components/login/mainLogin";
import "./styles/styles.css";
import "./styles/header.css";
import "./styles/login.css";
import "./styles/accounts.css";
import "./styles/account.css";
import "./styles/historyBalance.css";
import "./styles/currency.css";
import "./styles/map.css";
import "./styles/modal.css";
import "./styles/spinner.css";
import "./styles/skeleton.css";

page({ hashbang: true });
// Функция для создания общей структуры страницы (шапка + контент)
const createPageStructure = (contentComponent, buttons = []) => {
  const headerComponent = Header({
    buttons,
    navigateToPage: (newPage) => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page(newPage);
        reloadPage();
      }
    },
  });
  const pageContainer = document.createElement("div");
  pageContainer.append(headerComponent, contentComponent);
  document.body.innerHTML = "";
  document.body.append(pageContainer);
};
// Функция для перезагрузки страницы
const reloadPage = () => {
  location.reload();
};
// Страница входа
page("/login", () => {

  const loginComponent = Login({
    onLogin: () => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page("/accounts");
        reloadPage();
      }
    },
  });
  createPageStructure(loginComponent);
});
// Страница входа для пути "/""
page("/", () => {
  const loginComponent = Login({
    onLogin: () => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page("/accounts");
        reloadPage();
      }
    },
  });
  createPageStructure(loginComponent);
});
// Страница Accounts
page("/accounts", async () => {
  const authDta = JSON.parse(localStorage.getItem("auth"));
  const data = await getAccountsByToken(authDta.token);

  const accountsComponent = Accounts(data, {
    onAccounts: async (accountId) => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page(`/account?accountId=${accountId}`);
        reloadPage();
      }
    },
    onDeleteAccount: async (accountId) => {
      const deleteCard = await deleteAccount(data, accountId);
    },
  });
  createPageStructure(accountsComponent, [
    { text: "Банкоматы", newPage: "/map" },
    { text: "Счета", newPage: "/accounts" },
    { text: "Валюта", newPage: "/currency" },
    { text: "Выйти", newPage: "/login" },
  ]);
});
// Страница Account
page("/account", async () => {
  const authDta = JSON.parse(localStorage.getItem("auth"));
  const data = await getAccountsByToken(authDta.token);
  const paramsString = document.location.search;
  const accountIdParam = new URLSearchParams(paramsString);
  const accountId = accountIdParam.get("accountId");
  const accountItem = data.payload.find((item) => item.account === accountId);
  const account = await getAccount(authDta.token, accountId);
  const newPath = window.location.href.split("#")[0];
  window.history.pushState({ path: newPath }, "", newPath);

  setTimeout(() => {
    transfer(data.payload, account.payload.account);
    const transactions = account.payload.transactions;
    const mappedTransactions = transactions.map((transaction) => ({
      date: transaction.date,
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
    }));
    tableTransfer(mappedTransactions, account.payload.account);
    const accountDiagram = document.querySelector(".accountDiagram");
    diagram(mappedTransactions, accountDiagram);
  }, 100);

  const accountComponent = Account(accountItem, {
    onAccountBack: () => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page("/accounts");
        reloadPage();
      }
    },
    onAccountDiagram: async () => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page(`/historyBalance?historyBalanceId=${accountItem.account}`);
        reloadPage();
      }
    },
    onAccountHistory: () => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page(`/historyBalance?historyBalanceId=${accountItem.account}`);
        reloadPage();
      }
    },
  });
  createPageStructure(accountComponent, [
    { text: "Банкоматы", newPage: "/map" },
    { text: "Счета", newPage: "/accounts" },
    { text: "Валюта", newPage: "/currency" },
    { text: "Выйти", newPage: "/login" },
  ]);
});
// Страница HistoryBalance
page("/historyBalance", async () => {
  const authDta = JSON.parse(localStorage.getItem("auth"));
  const data = await getAccountsByToken(authDta.token);
  const paramsString = document.location.search;
  const historyBalanceIdParam = new URLSearchParams(paramsString);
  const historyBalanceId = historyBalanceIdParam.get("historyBalanceId");
  const historyBalanceItem = data.payload.find(
    (item) => item.account === historyBalanceId
  );
  const account = await getAccount(authDta.token, historyBalanceId);
  const newPath = window.location.href.split("#")[0];
  window.history.pushState({ path: newPath }, "", newPath);

  setTimeout(() => {
    const transactions = account.payload.transactions;
    const mappedTransactions = transactions.map((transaction) => ({
      date: transaction.date,
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
    }));
    tableTransfer(mappedTransactions, account.payload.account);
    const historyBalanceDiagram = document.querySelector(
      ".historyBalanceDiagram"
    );
    const historyBalanceAnotherDiagram = document.querySelector(
      ".historyBalanceAnotherDiagram"
    );
    diagram(mappedTransactions, historyBalanceDiagram);
    diagramAdvanced(mappedTransactions, historyBalanceAnotherDiagram);
  }, 100);

  const historyBalanceComponent = HistoryBalance(historyBalanceItem, {
    onHistoryBalanceBack: () => {
      const userSuccessfullyLoggedIn = true;
      if (userSuccessfullyLoggedIn) {
        page(`/account?accountId=${historyBalanceItem.account}`);
        reloadPage();
      }
    },
  });
  createPageStructure(historyBalanceComponent, [
    { text: "Банкоматы", newPage: "/map" },
    { text: "Счета", newPage: "/accounts" },
    { text: "Валюта", newPage: "/currency" },
    { text: "Выйти", newPage: "/login" },
  ]);
});
// Страница Currency
page("/currency", async () => {
  const authDta = JSON.parse(localStorage.getItem("auth"));
  const data = await getCurrencies(authDta.token);

  setTimeout(async () => {
    await currencyExchangeTransfer(data, authDta.token);
  }, 100);

  const currencyComponent = await Currency(data);
  createPageStructure(currencyComponent, [
    { text: "Банкоматы", newPage: "/map" },
    { text: "Счета", newPage: "/accounts" },
    { text: "Валюта", newPage: "/currency" },
    { text: "Выйти", newPage: "/login" },
  ]);
});
// Страница Map
page("/map", async () => {
  const mapComponent = await Map();
  createPageStructure(mapComponent, [
    { text: "Банкоматы", newPage: "/map" },
    { text: "Счета", newPage: "/accounts" },
    { text: "Валюта", newPage: "/currency" },
    { text: "Выйти", newPage: "/login" },
  ]);
});
// Добавляем обработчик для 404 страницы
page("*", () => {
  const notFoundComponent = document.createElement("p");
  notFoundComponent.textContent = "404: Страница не найдена";
  createPageStructure(notFoundComponent);
});

page.start();


window.addEventListener("load", () => {
  setTimeout(() => {
    const skeletons = document.querySelectorAll(".skeleton");
    setTimeout(() => {
      skeletons.forEach((skeleton) => {
        skeleton.classList.remove("skeleton");
      });
    }, 100);
  }, 500);
});


