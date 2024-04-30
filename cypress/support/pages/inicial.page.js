export default class InicialPage {
  buttonNovo = '[href="/users/novo"]';
  campoPesquisa = ".sc-gsFSXq";
  detalhesUsuario = ".sc-hzhJZQ";

  Pesquisa(nome) {
    cy.get(this.campoPesquisa).type(nome);
  }
  clickNovo() {
    cy.get(this.buttonNovo).click();
  }

  pegaPrimeiroUser() {
    cy.get(this.detalhesUsuario).first().click();
  }
  pegaUltimoUser() {
    cy.get(this.detalhesUsuario).last().click();
  }
}
