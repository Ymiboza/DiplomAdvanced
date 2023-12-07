import { timer } from "../../icons/icons";
import { currencyChangeCourseFunction } from "./currencyChangeCourseFunction";
import { currencyExchange } from "./currencyExchange";
import { currencyYourElementFunction } from "./currencyYourElementFunction";

export const Currency = async (data) => {
  const currencyContainer = document.createElement("div");
  const currencyTitle = document.createElement("h1");
  const currencyContentContainer = document.createElement("div");
  const currencyFirstBlock = document.createElement("div");
  const currencyYoursBlock = document.createElement("div");
  const currencyYoursTitle = document.createElement("h2");
  const currencyYoursContentBlock = document.createElement("div");
  const currencyExchangeBlock = document.createElement("div");
  const currencyExchangeTitle = document.createElement("h2");
  const currencyExchangeMainBlock = document.createElement("div");
  const currencySecondBlock = document.createElement("div");
  const currencyChangeTitle = document.createElement("div");
  const currencyFlex = document.createElement("div");
  const currencyChangeBox = document.createElement("div");
  const currencyTimerBlock = document.createElement("div");

  currencyContainer.className = "currencyContainer";
  currencyTitle.className = "currencyTitle";
  currencyContentContainer.className = "currencyContentContainer";
  currencyFirstBlock.className = "currencyFirstBlock";
  currencyYoursBlock.className = "currencyYoursBlock";
  currencyYoursTitle.className = "currencyYoursTitle";
  currencyYoursContentBlock.className = "currencyYoursContentBlock";
  currencyExchangeBlock.className = "currencyExchangeBlock";
  currencyExchangeTitle.className = "currencyExchangeTitle";
  currencyExchangeMainBlock.className = "currencyExchangeMainBlock";
  currencySecondBlock.className = "currencySecondBlock";
  currencyChangeTitle.className = "currencyChangeTitle";
  currencyFlex.className = "currencyFlex"
  currencyChangeBox.className = "currencyChangeBox";
  currencyTimerBlock.className = "currencyTimerBlock"

  currencyTitle.textContent = "Валютный обмен";
  currencyYoursTitle.textContent = "Ваши валюты";
  currencyExchangeTitle.textContent = "Обмен валюты";
  currencyChangeTitle.textContent = "Изменение курсов в реальном времени";

  for (const key in data.payload) {
    const item = data.payload[key];
    currencyYoursContentBlock.append(
      currencyYourElementFunction(item.code, item.amount)
    );
  }

  currencyFlex.style = "display: flex; align-items: center; justify-content: center;"
  currencyTimerBlock.innerHTML = timer;
  currencyChangeBox.style.display = "none";
  setTimeout(() => {
    currencyFlex.style = ""
    currencyTimerBlock.innerHTML = "";
    currencyChangeBox.style.display = "flex";
  }, 12610);

  currencyChangeBox.append(currencyChangeCourseFunction());
  currencyFlex.append(currencyTimerBlock)
  currencySecondBlock.append(currencyChangeTitle,currencyChangeBox, currencyFlex);
  currencyExchangeBlock.append(
    currencyExchangeTitle,
    currencyExchange(currencyExchangeMainBlock)
  );
  currencyYoursBlock.append(currencyYoursTitle, currencyYoursContentBlock);
  currencyFirstBlock.append(currencyYoursBlock, currencyExchangeBlock);
  currencyContentContainer.append(currencyFirstBlock, currencySecondBlock);
  currencyContainer.append(currencyTitle, currencyContentContainer);

  return currencyContainer;
};
