describe("E2E тесты", () => {
  beforeEach(() => {
    cy.viewport(1600, 1400);
    cy.visit("http://localhost:8080/login");
  });
  it("Страница имеет два инпута и кнопку", () => {
    cy.get(".inputLogin").should("have.length", 2);
    cy.get(".loginUserButton").should("have.length", 1);
  });

  it("Нажать на кнопку и проверить, что ничего не происходит, если она disabled", () => {
    cy.get(".loginUserButton").should("be.disabled");
  });

  it("Валидация с не корректными значениями, когда value меньше 6-ти символов", () => {
    const invalidLogin = "dev";
    const invalidPassword = "dev";

    cy.get(".loginUserLogin").type(invalidLogin);
    cy.get(".loginUserPassword").type(invalidPassword);

    cy.get(".loginErrorMassageLogin").should("contain", "Не меньше 6 символов");
    cy.get(".loginErrorMassagePassword").should(
      "contain",
      "Не меньше 6 символов"
    );

    cy.get(".loginUserButton").should("be.disabled");
  });

  it("Валидация с не корректными значениями, когда введен неправильный логин или пароль", () => {
    const invalidLogin = "developer123";
    const invalidPassword = "developer123";

    cy.get(".loginUserLogin").type(invalidLogin);
    cy.get(".loginUserPassword").type(invalidPassword);
    cy.get(".loginUserButton").click();

    cy.get(".loginErrorMassage").should("contain", "Invalid login or password");

    cy.get(".loginUserButton").should("be.disabled");
    cy.get(".loginUserLogin").should("have.value", "");
    cy.get(".loginUserPassword").should("have.value", "");
  });

  it("Валидация полностью валидна и осуществляет переход в аккаунт", () => {
    const invalidLogin = "developer";
    const invalidPassword = "developer";

    cy.get(".loginUserLogin").type(invalidLogin);
    cy.get(".loginUserPassword").type(invalidPassword);
    cy.get(".loginUserButton").click();

    cy.url().should("include", "/accounts");
  });
});
