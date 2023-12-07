import { Header } from "../components/header/header";
import { Login } from "../components/login/login";
import { validationLogin } from "../utils/validation";

describe("Тесты", () => {
  it("Создание DOM-дерева с двумя полями ввода и плейсхолдерами, а так же кнопки", async () => {
    window.TEST_ENVIRONMENT = true;
    const createPageStructure = (contentComponent, buttons = []) => {
      const headerComponent = Header({
        buttons,
        navigateToPage: (newPage) => {
          const userSuccessfullyLoggedIn = true;
          if (userSuccessfullyLoggedIn) {
            page(newPage);
            reloadPage();
          }
        },
      });
      const pageContainer = document.createElement("div");
      pageContainer.append(headerComponent, contentComponent);
      document.body.innerHTML = "";
      document.body.append(pageContainer);
    };
    const loginComponent = Login({
      onLogin: () => {
        const userSuccessfullyLoggedIn = true;
        if (userSuccessfullyLoggedIn) {
          page("/accounts");
          reloadPage();
        }
      },
    });
    createPageStructure(loginComponent);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const inputs = document.querySelectorAll(".inputLogin");
    const button = document.querySelector(".loginUserButton")
    expect(inputs.length).toBe(2);
    const placeholderValues = Array.from(inputs).map(
      (input) => input.placeholder
    );
    expect(placeholderValues).toEqual(["Login", "Password"]);
    expect(button.textContent).toEqual("Войти")
    window.TEST_ENVIRONMENT = false;
  });

  it("Валидация корректна", () => {
    document.body.innerHTML = `
  <div>
    <span class="loginErrorMassageLogin"></span>
    <span class="loginErrorMassagePassword"></span>
    <input class="inputLogin loginUserLogin" />
    <input class="inputLogin loginUserPassword" />
    <button class="loginUserButton" disabled></button>
    <div class="loginErrorMassage"></div>
  </div>
`;
    const errorMessageLogin = document.querySelector(".loginErrorMassageLogin");
    const errorMessagePassword = document.querySelector(
      ".loginErrorMassagePassword"
    );
    const loginInput = document.querySelector(".loginUserLogin");
    const passwordInput = document.querySelector(".loginUserPassword");
    const btn = document.querySelector(".loginUserButton");

    validationLogin(
      [errorMessageLogin, errorMessagePassword],
      loginInput,
      passwordInput,
      btn
    );
    loginInput.value = "developer";
    passwordInput.value = "developer";
    loginInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    expect(btn.disabled).toBe(false);
  });

  it("Валидация не корректна, пустые инпуты", () => {
    const errorMessageLogin = document.querySelector(".loginErrorMassageLogin");
    const errorMessagePassword = document.querySelector(".loginErrorMassagePassword");
    const loginInput = document.querySelector(".loginUserLogin");
    const passwordInput = document.querySelector(".loginUserPassword");
    const btn = document.querySelector(".loginUserButton");

    validationLogin([errorMessageLogin, errorMessagePassword], loginInput, passwordInput, btn);

    loginInput.value = "";
    passwordInput.value = "";
    loginInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));

    expect(btn.disabled).toBe(true);
  });

  it("Валидация не корректна, введено меньше шести символов", () => {
    const errorMessageLogin = document.querySelector(".loginErrorMassageLogin");
    const errorMessagePassword = document.querySelector(".loginErrorMassagePassword");
    const loginInput = document.querySelector(".loginUserLogin");
    const passwordInput = document.querySelector(".loginUserPassword");
    const btn = document.querySelector(".loginUserButton");

    validationLogin([errorMessageLogin, errorMessagePassword], loginInput, passwordInput, btn);

    loginInput.value = "dev";
    passwordInput.value = "dev";
    loginInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));

    expect(btn.disabled).toBe(true);
  });

});
