import { close } from "../../icons/icons";
import { showSpinnerS } from "../../utils/spinner";

export const modalDelete = (data, { accountsCard, onDeleteAccount }) => {
  const modalFullscreen = document.createElement("div");
  const modalBlock = document.createElement("div");
  const modalTop = document.createElement("div");
  const modalClose = document.createElement("div");
  const modalTitle = document.createElement("h2");
  const modalDeleteBlock = document.createElement("div");
  const modalDeleteButton = document.createElement("button");
  const modalCheckboxContainer = document.createElement("div");
  const modalCheckboxInput = document.createElement("input");
  const modalCheckboxLabel = document.createElement("label");
  const modalCheckboxSpan = document.createElement("span");

  modalFullscreen.className = "modalFullscreen";
  modalBlock.className = "modalBlock";
  modalTop.className = "modalTop";
  modalTitle.className = "modalTitle";
  modalClose.className = "modalClose";
  modalDeleteBlock.className = "modalDeleteBlock";
  modalDeleteButton.className = "modalDeleteButtonDisabled";
  modalCheckboxContainer.className = "modalCheckboxContainer";
  modalCheckboxInput.className = "modalCheckboxInput";
  modalCheckboxLabel.className = "modalCheckboxLabel";
  modalCheckboxSpan.className = "modalCheckboxSpan";

  modalClose.innerHTML = close;
  modalTitle.textContent = "Удалить счет?";
  modalDeleteButton.textContent = "Удалить";
  modalCheckboxInput.type = "checkbox";
  modalCheckboxSpan.textContent = "Подтвердить удаление счета";
  modalDeleteButton.disabled = "true";

  modalCheckboxInput.addEventListener("change", () => {
    modalDeleteButton.disabled = !modalCheckboxInput.checked;
    if (modalCheckboxInput.checked) {
      modalDeleteButton.classList.remove("modalDeleteButtonDisabled");
      modalDeleteButton.classList.add("modalDeleteButton");
    } else {
      modalDeleteButton.classList.remove("modalDeleteButton");
      modalDeleteButton.classList.add("modalDeleteButtonDisabled");
    }
  });

  modalDeleteButton.addEventListener("click", async () => {
    if (onDeleteAccount) {
      showSpinnerS(modalDeleteButton);
      try {
        await onDeleteAccount(data.account);
      } catch (error) {
        console.error(error);
      }
    }
    modalBlock.classList.add("modalHide");
    setTimeout(() => {
      accountsCard.remove();
      modalFullscreen.remove();
    }, 500);
  });

  modalClose.addEventListener("click", () => {
    modalBlock.classList.add("modalHide");
    setTimeout(() => {
      modalFullscreen.remove();
    }, 500);
  });

  modalCheckboxLabel.append(modalCheckboxInput, modalCheckboxSpan);
  modalCheckboxContainer.append(modalCheckboxLabel);
  modalDeleteBlock.append(modalDeleteButton, modalCheckboxContainer);
  modalTop.append(modalTitle, modalClose);
  modalBlock.append(modalTop, modalDeleteBlock);
  modalFullscreen.append(modalBlock);
  document.body.append(modalFullscreen);
};
