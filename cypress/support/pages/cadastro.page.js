export default class CadastroPage {
  inputNome = "#name";
  inputEmail = "#email";
  buttonSalvar = ".sc-dAlyuH";
  buttonVoltar = "[href='/users']"

  typeNome(nome){
    cy.get(this.inputNome).type(nome)
  }
  typeEmail(email){
    cy.get(this.inputEmail).type(email)
  }
  clickSalvar(){
    cy.get(this.buttonSalvar).click()
  }

  clickVoltar(){
    cy.get(this.buttonVoltar).click()
  }
}
