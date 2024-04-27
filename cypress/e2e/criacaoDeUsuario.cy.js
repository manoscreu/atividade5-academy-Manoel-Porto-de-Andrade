import { faker } from "@faker-js/faker";

describe("Teste de Criação de usuário", function () {
  beforeEach(function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });
  describe("Testes de criação invalida", function () {
    it("Não deve ser possível criar um usuário sem preencher os campos nome e email", function () {
      cy.contains("a", "Novo").click();
      cy.contains("button", "Salvar").click();
      cy.get(".sc-cPiKLX.feFrSQ")
        .invoke("text")
        .should(
          "equal",
          "O campo nome é obrigatório.O campo e-mail é obrigatório."
        );
    });
  });
  describe("Teste de criação usuário ja existente", function () {
    it("Não deve ser possível criar um usuário com um email ja em uso", function () {
      cy.intercept("POST", "api/v1/users", {
        statusCode: 422,
        fixture: "/mocks/userExistente.json",
      }).as("postUsuario");
      cy.stub().as("stubAlerta");

      cy.on("window:alert", this.stubAlerta);
      cy.contains("a", "Novo").click();
      cy.get("#name").type("Manel");
      cy.get("#email").type("qa@qa.com");
      cy.contains("button", "Salvar").click();
      cy.wait("@postUsuario");
      //TODO criar teste com usuário ja criado com o mock do intercept
      cy.contains(".sc-dCFHLb", "p")
        .get("p")
        .invoke("text")
        .should("equal", "Este e-mail já é utilizado por outro usuário.");
    });
  });

  describe("Testes no campo nome", function () {
    it("Não deve ser possível criar um usuário sem preencher o campo nome", function () {
      cy.contains("a", "Novo").click();
      cy.get("#email").type("qa@qa.com");
      cy.contains("button", "Salvar").click();
      cy.get(".sc-cPiKLX.feFrSQ")
        .invoke("text")
        .should("equal", "O campo nome é obrigatório.");
    });
    it("Não deve ser possível criar um usuário com nome maior que 100 caracteres", function () {
      cy.contains("a", "Novo").click();
      cy.get("#name").type(
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Morbi ante dui ullamcorper vel sem id pharetra"
      );
      cy.get("#email").type("qa@qa.com");
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Informe no máximo 100 caracteres para o nome");
    });
    it("Não deve ser possível criar um usuário com nome menor que 4 caracteres", function () {
      cy.contains("a", "Novo").click();
      cy.get("#name").type("Ted");
      cy.get("#email").type("qa@qa.com");
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Informe pelo menos 4 letras para o nome.");
    });
  });

  describe("Testes no campo E-mail", function () {
    it("Não deve ser possível criar um usuário com um email invalido", function () {
      cy.contains("a", "Novo").click();
      cy.get("#name").type("Manoel");
      cy.get("#email").type("qa@qa");
      cy.contains("button", "Salvar").click();
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Formato de e-mail inválido");
    });

    it("Não deve ser possível criar um usuário sem preencher o campo email", function () {
      cy.contains("a", "Novo").click();
      cy.get("#name").type("Manoel");
      cy.contains("button", "Salvar").click();
      cy.get(".sc-cPiKLX.feFrSQ")
        .invoke("text")
        .should("equal", "O campo e-mail é obrigatório.");
    });

    it("Não deve ser possível criar um usuário com um email maior que 60 caracteres", function () {
      cy.contains("a", "Novo").click();
      cy.get("#name").type("Manoel");
      cy.get("#email").type(
        "LoremipsumdolorsitametconsecteturadipiscingelitMorbiantedui@qa.com"
      );
      cy.contains("button", "Salvar").click();
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Informe no máximo 60 caracteres para o e-mail");
    });
    it("Não deve ser possível criar um usuário com um email menor que 4 caracteres", function () {
      cy.contains("a", "Novo").click();
      cy.get("#name").type("Manoel");
      cy.get("#email").type("ted");
      cy.contains("button", "Salvar").click();
      cy.get(".sc-jEACwC")
        .invoke("text")
        .should("equal", "Informe pelo menos 4 caracteres para o e-mail.");
    });
  });
});
