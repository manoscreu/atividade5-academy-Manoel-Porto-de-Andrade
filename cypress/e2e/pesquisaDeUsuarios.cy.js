import InicialPage from "../support/pages/inicial.page";
describe("Testes de pesquisa de usuário", function () {
  let paginaInicial = new InicialPage();
  let nome;
  let email;
  beforeEach(function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
  });
  describe("Testes de preenchimento de campos", function () {
    it("Teste de pesquisa por nome", function () {
      cy.criaUsuario()
        .then(function (userData) {
          nome = userData.userName;
        })
        .then(function () {
          paginaInicial.Pesquisa(nome);
        })
        .then(function () {
          cy.get("#userData > div.sc-dAbbOL.lcgSvJ > p:nth-child(1)")
            .invoke("text")
            .should("equal", "Nome: " + nome);
        });

      cy.wait(3000);
    });
    it("Teste de pesquisa por email", function () {
      cy.criaUsuario()
        .then(function (userData) {
          nome = userData.userName
          email = userData.userEmail;
        })
        .then(function () {
          paginaInicial.Pesquisa(email);
        })
        .then(function () {
          cy.get("#userData > div.sc-dAbbOL.lcgSvJ > p:nth-child(1)")
            .invoke("text")
            .should("include", "Nome: " + nome);
        });
      cy.wait(3000);
    });
  });

  describe("Testes usuários Múltiplos", function () {
    it("Teste de pesquisa mais de usuário com o mesmo nome", function () {
      let nome;
      cy.criaDoisUsuarios()
        .then(function (userData) {
          nome = userData.nomeUser;
        })
        .then(function () {
          paginaInicial.Pesquisa(nome);
        });
      cy.wait(3000);
    });
  });
});
