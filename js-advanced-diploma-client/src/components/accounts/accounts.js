import { plus } from "../../icons/icons";
import { createAccount } from "../../network/index";
import { showSpinnerS } from "../../utils/spinner";
import { accountsCard } from "./accountsCard";

export const Accounts = (data, { onAccounts, onDeleteAccount }) => {
  const accountsContainer = document.createElement("div");
  const accountsHeadContainer = document.createElement("div");
  const invoicedHeadBlock = document.createElement("div");
  const accountsTitle = document.createElement("h1");
  const accountsDropdown = document.createElement("select");
  const accountsDropdownPlaceholder = document.createElement("option");
  const accountsOption1 = document.createElement("option");
  const accountsOption2 = document.createElement("option");
  const accountsOption3 = document.createElement("option");
  const accountsButtonNew = document.createElement("button");

  accountsContainer.className = "accountsContainer";
  accountsHeadContainer.className = "accountsHeadContainer";
  invoicedHeadBlock.className = "invoicedHeadBlock";
  accountsTitle.className = "accountsTitle";
  accountsDropdown.className = "accountsDropdown";
  accountsDropdownPlaceholder.className = "accountsDropdownPlaceholder";
  accountsOption1.className = "accountsOption1";
  accountsOption2.className = "accountsOption2";
  accountsOption3.className = "accountsOption3";
  accountsButtonNew.className = "accountsButtonNew skeleton";
  accountsButtonNew.id = "skeleton"

  accountsTitle.textContent = "Ваши счета";
  accountsDropdownPlaceholder.value = "";
  accountsDropdownPlaceholder.text = "Сортировка";
  accountsDropdownPlaceholder.disabled = true;
  accountsDropdownPlaceholder.selected = true;
  accountsDropdownPlaceholder.hidden = true;
  accountsOption1.value = "По номеру";
  accountsOption1.text = "По номеру";
  accountsOption1.style.paddingBottom = 20;
  accountsOption2.value = "По балансу";
  accountsOption2.text = "По балансу";
  accountsOption3.value = "По последней транзакции";
  accountsOption3.text = "По последней транзакции";
  accountsDropdown.placeholder = "Сортировка";
  accountsButtonNew.innerHTML = plus + "Создать новый счет";

  const accountsCardContainer = document.createElement("div");
  accountsCardContainer.className = "accountsCardContainer";

  accountsButtonNew.addEventListener("click", async () => {
    showSpinnerS(accountsButtonNew);
    try {
      await createAccount("ZGV2ZWxvcGVyOnNraWxsYm94");
    } catch (error) {
      console.error(error);
    } finally {
      location.reload();
    }
  });

  const renderAccounts = (accounts) => {
    setTimeout(() => {
      const skeletons = document.querySelectorAll(".skeleton");
      setTimeout(() => {
        skeletons.forEach((skeleton) => {
          skeleton.classList.remove("skeleton");
        });
      }, 100);
    }, 500);
    accountsCardContainer.innerHTML = "";
    accounts.forEach((payload) => {
      const accountCard = accountsCard(payload, {
        onAccounts,
        onDeleteAccount,
      });
      accountsCardContainer.append(accountCard);
    });
  };

  const sortByAccountNumber = () => {
    const sortedAccounts = data.payload.slice().sort((a, b) => {
      return a.account.localeCompare(b.account);
    });
    renderAccounts(sortedAccounts);
  };

  const sortByBalance = () => {
    const sortedAccounts = data.payload.slice().sort((a, b) => {
      return a.balance - b.balance;
    });
    renderAccounts(sortedAccounts);
  };

  const sortByLastTransaction = () => {
    const sortedAccounts = data.payload.slice().sort((a, b) => {
      const dateA =
        a.transactions.length > 0 ? new Date(a.transactions[0].date) : null;
      const dateB =
        b.transactions.length > 0 ? new Date(b.transactions[0].date) : null;
      if (dateA && dateB) {
        return dateA - dateB;
      } else if (dateA) {
        return -1;
      } else if (dateB) {
        return 1;
      } else {
        return 0;
      }
    });
    renderAccounts(sortedAccounts);
  };

  accountsDropdown.addEventListener("change", () => {
    const selectedValue = accountsDropdown.value;

    if (selectedValue === "По номеру") {
      sortByAccountNumber();
    } else if (selectedValue === "По балансу") {
      sortByBalance();
    } else if (selectedValue === "По последней транзакции") {
      sortByLastTransaction();
    }
  });

  accountsDropdown.append(
    accountsDropdownPlaceholder,
    accountsOption1,
    accountsOption2,
    accountsOption3
  );
  invoicedHeadBlock.append(accountsTitle, accountsDropdown);
  accountsHeadContainer.append(invoicedHeadBlock, accountsButtonNew);
  accountsContainer.append(accountsHeadContainer, accountsCardContainer);

  if (data && data.payload) {
    data.payload.forEach((payload) => {
      const accountCard = accountsCard(payload, {
        onAccounts,
        onDeleteAccount,
      });
      accountsCardContainer.append(accountCard);
    });
  } else {
    console.error("Ошибка: отсутствует data или data.payload");
  }
  return accountsContainer;
};
