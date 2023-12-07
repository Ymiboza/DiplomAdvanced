import { errorField, successField } from "../icons/icons";
import { exchangeCurrencies } from "../network";
import { hideSpinnerS, showSpinnerS } from "./spinner";

export const currencyExchangeTransfer = async (data, token) => {
  const currencyTransferFrom = document.querySelector(
    ".currencyExchangeDropdownFrom"
  );
  const currencyTransferIn = document.querySelector(
    ".currencyExchangeDropdownIn"
  );
  const currencyTransferAmount = document.querySelector(
    ".currencyExchangeSumInput"
  );
  const currencyTransferError = document.querySelector(
    ".currencyExchangeSumInputError"
  );
  const currencyTransferBtn = document.querySelector(".currencyExchangeButton");

  for (const key in data.payload) {
    const item = data.payload[key];
    const optionFrom = document.createElement("option");
    const optionIn = document.createElement("option");

    optionFrom.className = "optionFrom";
    optionIn.className = "optionIn";

    optionFrom.textContent = item.code;
    optionIn.textContent = item.code;

    currencyTransferFrom.append(optionFrom);
    currencyTransferIn.append(optionIn);
  }

  currencyTransferAmount.addEventListener("input", () => {
    currencyTransferAmount.classList.remove("invalid");
    currencyTransferError.innerHTML = "";
  });

  currencyTransferBtn.addEventListener("click", async () => {
    showSpinnerS(currencyTransferBtn);
    if (!currencyTransferAmount.value) {
      currencyTransferAmount.classList.add("invalid");
      currencyTransferError.classList.add("invalidSpan");
      currencyTransferError.innerHTML = errorField + "Введите сумму!";
      setTimeout(() => {
        hideSpinnerS(currencyTransferBtn);
      }, 200);
      return;
    }

    if (currencyTransferAmount.value <= 0) {
      currencyTransferAmount.classList.add("invalid");
      currencyTransferError.classList.add("invalidSpan");
      currencyTransferError.innerHTML = errorField + "Неправильная сумма!";
      setTimeout(() => {
        hideSpinnerS(currencyTransferBtn);
      }, 200);
      return;
    }

    const currencyTransfer = await exchangeCurrencies(
      token,
      currencyTransferFrom.options[currencyTransferFrom.selectedIndex].text,
      currencyTransferIn.options[currencyTransferIn.selectedIndex].text,
      currencyTransferAmount.value
    );

    if (currencyTransfer.error) {
      if (currencyTransfer.error === "Not enough currency") {
        currencyTransferAmount.classList.add("invalid");
        currencyTransferError.classList.add("invalidSpan");
        currencyTransferError.innerHTML = errorField + "Недостаточно валюты!";
        setTimeout(() => {
          hideSpinnerS(currencyTransferBtn);
        }, 200);
        return;
      }
      if (currencyTransfer.error === "Overdraft prevented") {
        currencyTransferAmount.classList.add("invalid");
        currencyTransferError.classList.add("invalidSpan");
        currencyTransferError.innerHTML =
          errorField + "Овердрафт предотвращен!";
        setTimeout(() => {
          hideSpinnerS(currencyTransferBtn);
        }, 200);
        return;
      }
      if (currencyTransfer.error === "Invalid amount") {
        currencyTransferAmount.classList.add("invalid");
        currencyTransferError.classList.add("invalidSpan");
        currencyTransferError.innerHTML = errorField + "Неправильная сумма!";
        setTimeout(() => {
          hideSpinnerS(currencyTransferBtn);
        }, 200);
        return;
      }
    } else {
      currencyTransferError.classList.add("validSpan");
      currencyTransferError.style = "margin-left: 10px; font-size: 15px;";
      currencyTransferError.innerHTML =
        successField + "Операция прошла успешно!";
      currencyTransferAmount.value = "";
      currencyTransferAmount.classList.add("valid");
      setTimeout(async () => {
        hideSpinnerS(currencyTransferBtn);
        location.reload();
      }, 1000);
    }
  });
};
