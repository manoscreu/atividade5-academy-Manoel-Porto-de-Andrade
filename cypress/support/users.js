import { faker } from "@faker-js/faker";

Cypress.Commands.add("criaUsuario", function () {
  let emailTeste = faker.internet.email();
  let nomeTeste = faker.person.fullName();
  let uId;
  cy.request(
    "POST",
    "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
    {
      name: nomeTeste,
      email: emailTeste,
    }
  )
    .then(function (response) {
      uId = response.body.id;
    })
    .then(function () {
      return {
        userId: uId,
        userName: nomeTeste,
        userEmail: emailTeste,
      };
    });
});

Cypress.Commands.add("criaDoisUsuarios", function () {
  let nome = faker.person.fullName();
  let emailTeste1 = faker.internet.email();
  let emailTeste2 = faker.internet.email();

  let uId1;
  let uId2;
  cy.request(
    "POST",
    "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
    {
      name: nome,
      email: emailTeste1,
    }
  )
    .then(function (response) {
      uId1 = response.body.id;
    })
    .then(function () {
      cy.request(
        "POST",
        "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users",
        {
          name: nome,
          email: emailTeste2,
        }
      )
        .then(function (response) {
          uId2 = response.body.id;
        })
        .then(function () {
          return {
            nomeUser: nome,
            userId1: uId1,
            userId2: uId2,
          };
        });
    });
});

Cypress.Commands.add("deletaUsuarios", function (id) {
  cy.request(
    "DELETE",
    "https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users/" + id
  );
});
