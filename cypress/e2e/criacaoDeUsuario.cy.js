import CadastroPage from "../support/pages/cadastro.page";
import InicialPage from "../support/pages/inicial.page";
import { faker } from "@faker-js/faker";

describe("Teste de Criação de usuário", function () {
  var paginaCadastro = new CadastroPage();
  var paginaInicial = new InicialPage();
  beforeEach(function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });
  describe("Teste de criação usuário ja existente", function () {
    it("Não deve ser possível criar um usuário com um email ja em uso", function () {
      cy.intercept("POST", "api/v1/users", {
        statusCode: 422,
        fixture: "/mocks/userExistente.json",
      }).as("postUsuario");
      cy.stub().as("stubAlerta");

      cy.on("window:alert", this.stubAlerta);
      paginaInicial.clickNovo();
      paginaCadastro.typeNome("Manoel");
      paginaCadastro.typeEmail("qa@qa.com");
      paginaCadastro.clickSalvar();
      cy.wait("@postUsuario");
      cy.contains(".sc-dCFHLb", "p")
        .get("p")
        .invoke("text")
        .should("equal", "Este e-mail já é utilizado por outro usuário.");
    });
  });
  describe("Testes no campo nome", function () {
    it("Não deve ser possível criar um usuário sem preencher o campo nome", function () {
      paginaInicial.clickNovo();
      paginaCadastro.typeEmail("qa@qa.com");
      paginaCadastro.clickSalvar();
      cy.get(".sc-cPiKLX.feFrSQ")
        .invoke("text")
        .should("equal", "O campo nome é obrigatório.");
    });
    it("Não deve ser possível criar um usuário com nome maior que 100 caracteres", function () {
      paginaInicial.clickNovo();
      paginaCadastro.typeNome(
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Morbi ante dui ullamcorper vel sem id pharetra"
      );
      paginaCadastro.typeEmail("qa@qa.com");
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Informe no máximo 100 caracteres para o nome");
    });
  });
  describe("Testes no campo E-mail", function () {
    it("Não deve ser possível criar um usuário sem preencher o campo email", function () {
      paginaInicial.clickNovo();
      paginaCadastro.typeNome("Manoel");
      paginaCadastro.clickSalvar();
      cy.get(".sc-cPiKLX.feFrSQ")
        .invoke("text")
        .should("equal", "O campo e-mail é obrigatório.");
    });
    it("Não deve ser possível criar um usuário com um email invalido", function () {
      paginaInicial.clickNovo();
      paginaCadastro.typeNome("Manoel");
      paginaCadastro.typeEmail("qa@qa");
      paginaCadastro.clickSalvar();
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Formato de e-mail inválido");
    });

    it("Não deve ser possível criar um usuário com um email maior que 60 caracteres", function () {
      paginaInicial.clickNovo();
      paginaCadastro.typeNome("Manoel");
      paginaCadastro.typeEmail(
        "LoremipsumdolorsitametconsecteturadipiscingelitMorbiantedui@qa.com"
      );
      paginaCadastro.clickSalvar();
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Informe no máximo 60 caracteres para o e-mail");
    });
  });
  describe("Teste de criação valida", function () {
    let nome = faker.person.firstName();
    let email = faker.internet.email();
    it("Cria um usuário valido", function () {
      paginaInicial.clickNovo();
      paginaCadastro.typeNome(nome);
      paginaCadastro.typeEmail(email);
      paginaCadastro.clickSalvar();
      cy.get("#name").should("be.empty");
      cy.get("#email").should("be.empty");
      paginaCadastro.clickVoltar();
      paginaInicial.Pesquisa(email);
      cy.get('[data-test="userDataName"]')
        .invoke("text")
        .should("equal", "Nome: " + nome);
    });
  });
});
