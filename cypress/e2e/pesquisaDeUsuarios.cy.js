describe("Testes de pesquisa de usuário", function () {
  let nome;
  let email;
  let id1;
  let id2;
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
          cy.get(".sc-gsFSXq").type(nome);
        })
        .then(function () {
          cy.get("#userData > div.sc-dAbbOL.lcgSvJ > p:nth-child(1)")
            .invoke("text")
            .should("equal", "Nome: " + nome);
        });

      cy.wait(3000);
    });
    it.only("Teste de pesquisa por email", function () {
      cy.criaUsuario()
        .then(function (userData) {
          email = userData.userEmail;
        })
        .then(function () {
          cy.get(".sc-gsFSXq").type(email);
        })
        .then(function () {
          cy.get("#userData > div.sc-dAbbOL.lcgSvJ > p:nth-child(2)")
            .invoke("text")
            .should("include", "E-mail: " + email);
        });
      cy.wait(3000);
    });
  });

  describe("Testes usuários Múltiplos", function () {
    it("Teste de pesquisa mais de usuário com o mesmo nome", function () {
      let nome;
      cy.criaDoisUsuarios()
        .then(function (userData) {
          id1 = userData.userId1;
          id2 = userData.userId2;
          nome = userData.nomeUser;
        })
        .then(function () {
          cy.get(".sc-gsFSXq").type(nome);
        });
      cy.wait(3000);
    });
  });
});
