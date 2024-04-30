import InicialPage from "../support/pages/inicial.page";
var paginaInicial = new InicialPage();
describe("Teste de listagem de usuários", function () {
  beforeEach(function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });
  it("Clica no primeiro usuário da lista e verifica ", function () {
    paginaInicial.pegaPrimeiroUser()
    cy.get(".sc-eDPEul:eq(0)").invoke("text").should("equal", "id");
    cy.get('[name="id"]').should("be.visible");
    cy.get(".sc-eDPEul:eq(1)").invoke("text").should("equal", "Nome*");
    cy.get("#userName").should("be.visible");
    cy.get(".sc-eDPEul:eq(2)").invoke("text").should("equal", "E-mail*");
    cy.get("#userEmail").should("be.visible");
  });
  it("Clica no ultimo usuário da lista e verifica ", function () {
    paginaInicial.pegaUltimoUser()
    cy.get(".sc-eDPEul:eq(0)").invoke("text").should("equal", "id");
    cy.get('[name="id"]').should("be.visible");
    cy.get(".sc-eDPEul:eq(1)").invoke("text").should("equal", "Nome*");
    cy.get("#userName").should("be.visible")
    cy.get(".sc-eDPEul:eq(2)").invoke("text").should("equal", "E-mail*");
    cy.get("#userEmail").should("be.visible");
  });
  it("Caso não existam usuários cadastrados, deve exibir a opção de criar um novo", function () {
    cy.intercept("GET", "api/v1/users", { statusCode: 200, body: [] });
    cy.get(".sc-koXPp")
      .get("h3")
      .invoke("text")
      .should("equal", "Ops! Não existe nenhum usuário para ser exibido.");
    cy.get(".sc-koXPp")
      .get("p")
      .invoke("text")
      .should("equal", "Cadastre um novo usuário");
  });
});
