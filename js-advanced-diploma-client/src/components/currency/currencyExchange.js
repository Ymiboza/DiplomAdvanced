export const currencyExchange = (container) => {
  const currencyExchangeContentBlock = document.createElement("div");
  const currencyExchangeFromBlock = document.createElement("div");
  const currencyExchangeSpanFrom = document.createElement("span");
  const currencyExchangeDropdownFrom = document.createElement("select");
  const currencyExchangeSpanIn = document.createElement("span");
  const currencyExchangeDropdownIn = document.createElement("select");
  const currencyExchangeSumBlock = document.createElement("div");
  const currencyExchangeSumSpan = document.createElement("span");
  const currencyExchangeSumInput = document.createElement("input");
  const currencyExchangeSumInputError = document.createElement("span");
  const currencyExchangeButton = document.createElement("button");

  currencyExchangeContentBlock.className = "currencyExchangeContentBlock";
  currencyExchangeFromBlock.className = "currencyExchangeFromBlock";
  currencyExchangeSpanFrom.className = "currencyExchangeSpanFrom";
  currencyExchangeDropdownFrom.className = "currencyExchangeDropdownFrom skeleton";
  currencyExchangeSpanIn.className = "currencyExchangeSpanIn";
  currencyExchangeDropdownIn.className = "currencyExchangeDropdownIn skeleton";
  currencyExchangeSumBlock.className = "currencyExchangeSumBlock";
  currencyExchangeSumSpan.className = "currencyExchangeSumSpan";
  currencyExchangeSumInput.className = "currencyExchangeSumInput skeleton";
  currencyExchangeSumInputError.className = "currencyExchangeSumInputError";
  currencyExchangeButton.className = "currencyExchangeButton skeleton";

  currencyExchangeSpanFrom.textContent = "Из валюты";
  currencyExchangeSpanIn.textContent = "В валюту";
  currencyExchangeSumSpan.textContent = "Сумма";
  currencyExchangeButton.innerHTML = "Обменять";

  currencyExchangeSumBlock.append(
    currencyExchangeSumSpan,
    currencyExchangeSumInput,
    currencyExchangeSumInputError
  );
  currencyExchangeFromBlock.append(
    currencyExchangeSpanFrom,
    currencyExchangeDropdownFrom,
    currencyExchangeSpanIn,
    currencyExchangeDropdownIn
  );
  currencyExchangeContentBlock.append(
    currencyExchangeFromBlock,
    currencyExchangeSumBlock
  );
  container.append(currencyExchangeContentBlock, currencyExchangeButton);
  return container;
};
