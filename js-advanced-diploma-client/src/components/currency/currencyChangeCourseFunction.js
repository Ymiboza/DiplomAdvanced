import { arrowDown, arrowUP } from "../../icons/icons";
import { getCurrenciesFeed } from "../../network";

const createCurrencyChangeSegment = () => {
  const currencyChangeCourseBlock = document.createElement("div");
  const currencyChangeCourseValue = document.createElement("div");
  const currencyChangeCourseDots = document.createElement("div");
  const currencyChangeCourseNumber = document.createElement("div");

  currencyChangeCourseBlock.className = "currencyYoursElementBlock";
  currencyChangeCourseValue.className = "currencyChangeCurrency currency";
  currencyChangeCourseDots.className = "currencyChangeDots currency";
  currencyChangeCourseNumber.className = "currencyChangeNumber currency";

  currencyChangeCourseBlock.append(
    currencyChangeCourseValue,
    currencyChangeCourseDots,
    currencyChangeCourseNumber
  );

  return {
    block: currencyChangeCourseBlock,
    value: currencyChangeCourseValue,
    dots: currencyChangeCourseDots,
    number: currencyChangeCourseNumber,
  };
};

export const currencyChangeCourseFunction = () => {
  const currencyChangeBox = document.createElement("div");

  const segments = Array.from({ length: 21 }, () => createCurrencyChangeSegment());

  segments.forEach((segment) => {
    currencyChangeBox.append(segment.block);
  });

  let currentSegmentIndex = 0;

  const updateSegment = (data) => {
    const segment = segments[currentSegmentIndex];
    segment.value.textContent = data.from + "/" + data.to;

    if (data.change === 1) {
      segment.number.innerHTML = data.rate + arrowUP;
      segment.dots.style.borderBottom = "1px dashed var(--success)";
    }

    if (data.change === -1) {
      segment.number.innerHTML = data.rate + arrowDown;
      segment.dots.style.borderBottom = "1px dashed var(--error)";
    }

    currentSegmentIndex = (currentSegmentIndex + 1) % segments.length;
  };

  getCurrenciesFeed(updateSegment);

  return currencyChangeBox;
};
