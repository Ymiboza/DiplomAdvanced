import { auth } from "../../network/index";

export const authUser = () => {
  const loginBtn = document.querySelector('.loginUserButton');
  const loginInput = document.querySelector('.loginUserLogin');
  const passwordInput = document.querySelector('.loginUserPassword');
  const errorContainer = document.querySelector('.loginErrorMassage');

  if (loginBtn && loginInput && passwordInput) {
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const isAuth = await auth(loginInput.value, passwordInput.value);

      if (isAuth.auth) {
        localStorage.setItem('auth', JSON.stringify(isAuth));
        if (window.location.pathname !== '/accounts') {
          window.location.href = '/accounts';
        }
      } else {
        if (errorContainer) {
          errorContainer.style.display = 'block'
          errorContainer.textContent = "Invalid login or password";
        } else {
          console.error("Error container not found:", errorContainer);
        }
      }
      loginInput.value = ""
      passwordInput.value = ""
      loginBtn.disabled = 'false'
    });
  }
};
