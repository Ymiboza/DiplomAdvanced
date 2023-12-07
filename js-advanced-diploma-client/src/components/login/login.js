import { showSpinnerS } from "../../utils/spinner";
import { validationLogin } from "../../utils/validation";
import { authUser } from "./mainLogin";

export const Login = ({ onLogin }) => {
  const loginUserMainContainer = document.createElement("div");
  const loginUserContainer = document.createElement("div");
  const loginUserTitle = document.createElement("h2");
  const loginUserForm = document.createElement("form");
  const loginUserLoginLabel = document.createElement("label");
  const loginUserPasswordLabel = document.createElement("label");
  const loginUserLogin = document.createElement("input");
  const loginUserPassword = document.createElement("input");
  const loginUserSpanLogin = document.createElement("span");
  const loginUserSpanPassword = document.createElement("span");
  const loginUserButton = document.createElement("button");
  const loginErrorMassageLogin = document.createElement("span");
  const loginErrorMassagePassword= document.createElement("span");
  const loginErrorMassage = document.createElement("div");

  loginUserMainContainer.className = "loginUserMainContainer";
  loginUserContainer.className = "loginUserContainer";
  loginUserTitle.className = "loginUserTitle";
  loginUserLoginLabel.className = "loginUserLoginLabel inputs";
  loginUserPasswordLabel.className = "loginUserPasswordLabel inputs";
  loginUserLogin.className = " inputLogin loginUserLogin";
  loginUserPassword.className = "inputLogin loginUserPassword";
  loginUserSpanLogin.className = "loginUserSpanLogin";
  loginUserSpanPassword.className = "loginUserSpanPassword";
  loginUserButton.className = "loginUserButton";
  loginUserButton.disabled = 'true'
  loginErrorMassageLogin.className = "loginErrorMassageLogin errorSpanLogin";
  loginErrorMassagePassword.className = "loginErrorMassagePassword errorSpanLogin";
  loginErrorMassage.className = "loginErrorMassage";

  loginUserTitle.innerText = "Вход в аккаунт";
  loginUserSpanLogin.innerHTML = "Логин";
  loginUserSpanPassword.innerHTML = "Пароль";
  loginUserButton.innerHTML = "Войти";
  loginUserLogin.placeholder = "Login";
  loginUserPassword.placeholder = "Password";
  loginErrorMassage.innerHTML = ""

  loginUserForm.addEventListener("submit", async () => {
    if (onLogin) {
      showSpinnerS(loginUserButton);
      try {
        await onLogin();
      } catch (error) {
        console.error(error);
      }
    }
  });

  loginUserPasswordLabel.append(loginUserSpanPassword, loginUserPassword, loginErrorMassagePassword);
  loginUserLoginLabel.append(loginUserSpanLogin, loginUserLogin, loginErrorMassageLogin);
  loginUserForm.append(
    loginUserLoginLabel,
    loginUserPasswordLabel,
    loginUserButton
  );
  loginUserContainer.append(loginUserTitle, loginUserForm, loginErrorMassage);
  loginUserMainContainer.append(loginUserContainer)

  setTimeout(() => {
    validationLogin(
      [
        loginErrorMassageLogin,
        loginErrorMassagePassword,
      ],
      loginUserLogin,
      loginUserPassword,
      loginUserButton
    );
    authUser();
  }, 0);

  return loginUserMainContainer;
};
