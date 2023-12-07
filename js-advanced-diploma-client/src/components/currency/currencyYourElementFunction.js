export const currencyYourElementFunction = (currencyCode,currencyAmount) => {
  const currencyYoursElementBlock = document.createElement("div");
  const currencyValue = document.createElement("div");
  const currencyDots = document.createElement("div");
  const currencyNumber = document.createElement("div");

  currencyYoursElementBlock.className = "currencyYoursElementBlock";
  currencyValue.className = "currencyValue currency skeleton";
  currencyDots.className = "currencyDots currency";
  currencyNumber.className = "currencyNumber currency skeleton";

  currencyValue.textContent = currencyCode;
  currencyNumber.textContent = currencyAmount;

  currencyYoursElementBlock.append(currencyValue, currencyDots, currencyNumber);
  return currencyYoursElementBlock;
};
