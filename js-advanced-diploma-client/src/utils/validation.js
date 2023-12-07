import { errorField } from "../icons/icons";

export const validateForm = (errorMessage, loginInput, passwordInput) => {
  const loginError = document.querySelector(".login__error");
  const bothInputs = document.querySelectorAll(".login__input");

  bothInputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
      loginError.innerHTML = "";
    });
  });

  if (!loginInput.value && !passwordInput.value) {
    loginInput.classList.add("invalid");
    passwordInput.classList.add("invalid");
    setTimeout(() => {
      loginError.innerHTML = errorField+"Заполните поле!";
    }, 0);
  }
  if (errorMessage === "No such user") {
    loginInput.classList.add("invalid");
    loginError.innerHTML = errorField+"Пользователь не найден!";
  }
  if (errorMessage === "Invalid password") {
    passwordInput.classList.add("invalid");
    loginError.innerHTML = errorField+"Неправильный пароль!";
  }
};

export const validationLogin = (
  [errorMessageLogin, errorMessagePassword],
  loginInput,
  passwordInput,
  btn
) => {
  const loginErrorLogin = document.querySelector(".loginErrorMassageLogin");
  const loginErrorPassword = document.querySelector(
    ".loginErrorMassagePassword"
  );
  const bothInputs = document.querySelectorAll(".inputLogin");
  const loginErrorMassage = document.querySelector(".loginErrorMassage");
  let btnUnitLogin = false;
  let btnUnitPassword = false;
  bothInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!loginInput.value) {
        loginInput.classList.add("invalid");
        btnUnitLogin = false;
        if (errorMessageLogin) {
          errorMessageLogin.innerHTML = errorField+"Заполните поле!";
        }
      } else {
        loginInput.classList.remove("invalid");
        btnUnitLogin = true;
        if (loginErrorLogin) {
          loginErrorLogin.innerHTML = "";
        }
      }
      if (loginInput.value.length < 6) {
        loginInput.classList.add("invalid");
        btnUnitLogin = false;
        if (errorMessageLogin) {
          errorMessageLogin.innerHTML = errorField+"Не меньше 6 символов";
        }
      } else {
        loginInput.classList.remove("invalid");
        btnUnitLogin = true;
        if (loginErrorLogin) {
          loginErrorLogin.innerHTML = "";
        }
      }
      if (!passwordInput.value) {
        passwordInput.classList.add("invalid");
        btnUnitPassword = false;
        if (errorMessagePassword) {
          errorMessagePassword.innerHTML = errorField+"Заполните поле!";
        }
      } else {
        passwordInput.classList.remove("invalid");
        btnUnitPassword = true;
        if (loginErrorPassword) {
          loginErrorPassword.innerHTML = "";
        }
      }
      if (passwordInput.value.length < 6) {
        passwordInput.classList.add("invalid");
        btnUnitPassword = false;
        if (errorMessagePassword) {
          errorMessagePassword.innerHTML = errorField+"Не меньше 6 символов";
        }
      } else {
        passwordInput.classList.remove("invalid");
        btnUnitPassword = true;
        if (loginErrorPassword) {
          loginErrorPassword.innerHTML = "";
        }
      }
      if (btnUnitLogin === true && btnUnitPassword === true) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
      loginErrorMassage.style.display = "none";
    });

  });
  return true;
};
