export const showSpinnerS = (button) => {
  setTimeout(() => {
    button.classList.add("spinner");
  }, 0);
};

export const hideSpinnerS = (button) => {
  setTimeout(() => {
    button.classList.remove("spinner");
  }, 0);
};
