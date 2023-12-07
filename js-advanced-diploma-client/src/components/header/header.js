import { backArrow } from "../../icons/icons";

export const Header = ({ buttons, navigateToPage }) => {
  const headerContainer = document.createElement("div");
  const headerTitle = document.createElement("h1");

  headerContainer.className = "headerContainer";
  headerTitle.className = "headerTitle";

  headerTitle.textContent = "Coin.";

  headerContainer.append(headerTitle);

  const currentRoute = window.location.pathname;
  const headerButtonsContainer = document.createElement("div");
  const headerBurgerContainer = document.createElement("div");
  const headerBurgerIcon = document.createElement("div");
  const headerBurgerBar1 = document.createElement("div");
  const headerBurgerBar2 = document.createElement("div");
  const headerBurgerBar3 = document.createElement("div");
  const headerBurgerClose = document.createElement("div");

  headerButtonsContainer.className = "headerButtonsContainer";
  headerBurgerContainer.className = "headerBurgerContainer";
  headerBurgerIcon.className = "headerBurgerIcon";
  headerBurgerBar1.className = "headerBurgerBar";
  headerBurgerBar2.className = "headerBurgerBar";
  headerBurgerBar3.className = "headerBurgerBar";
  headerBurgerClose.className = "headerBurgerClose";

  headerBurgerClose.innerHTML = backArrow;

  headerBurgerIcon.append(headerBurgerBar1, headerBurgerBar2, headerBurgerBar3);
  headerBurgerContainer.append(headerBurgerIcon);

  headerBurgerIcon.addEventListener("click", function () {
    headerButtonsContainer.classList.toggle("show");
    headerBurgerIcon.style.display = "none";
    headerButtonsContainer.append(headerBurgerClose);
  });

  headerBurgerClose.addEventListener("click", function () {
    headerButtonsContainer.classList.toggle("show");
    headerBurgerIcon.style.display = "flex";
  })

  buttons.forEach(({ text, newPage }) => {
    const headerButton = document.createElement("button");
    headerButton.className = "headerButton skeleton";
    headerButton.textContent = text;

    headerButton.addEventListener("click", () => {
      navigateToPage(newPage);
    });
    headerButton.disabled = newPage === currentRoute;
    headerButtonsContainer.append(headerButton);
  });
  headerContainer.append(headerBurgerContainer, headerButtonsContainer);
  return headerContainer;
};
