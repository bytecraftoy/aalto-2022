describe('add IOBox', () => {
  it('Adds and removes IOBoxes', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Add box').click()
    cy.contains('Prompt')
  })
})