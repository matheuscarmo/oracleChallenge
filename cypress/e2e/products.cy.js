describe('QA Application', () => {
  beforeEach(() => {
    cy.visit('https://apex.oracle.com/pls/apex/r/danmende/qa-application/home')
    cy.get('input[placeholder="Username"]').type('QA_USER')
    cy.get('input[placeholder="Password"]').type('qatest123', { log: false })
    cy.contains('Sign In').click()
  })
  it('Access table and change the quantity of order 10 to 20', () => {
    cy.intercept('POST', '**pls/apex/wwv_flow.ajax?p_context=qa-application/home/**')
      .as('postSave')
    cy.get('tr[data-id="10"] > .u-tE').dblclick()
    cy.get('tr[data-id="10"] > .u-tE').type(20)
    cy.contains('Save').click()
    cy.wait('@postSave')
    cy.get('tr[data-id="10"] > .u-tE').should('contain', '20')
  })

  it.only('Access table and change the quantity of order 10 to 20', () => {
    cy.intercept('POST', '**pls/apex/wwv_flow.ajax?p_context=qa-application/home/**')
      .as('postSave')
    cy.wait('@postSave')
    cy.get('polygon[aria-label="Series: Store A; Group: Grapes; Value: 52. Selected"]')
      //.find('polygon[fill="#FFFFFF"]')
      .should('contain', 'Series: Store A; Group: Grapes; Value: 52.')

  })

  it('Access table and change the location of order 10 to Deli', () => {
    cy.intercept('POST', '**/pls/apex/wwv_flow.ajax?p_context=qa-application/home/**')
      .as('postLoadSearch')
    cy.get('[data-id="10"] > :nth-child(6)').dblclick()
    cy.get('[data-id="10"] > :nth-child(6)').type('D')
    cy.get('input[aria-label="Search"]').type('eli')
    cy.get('button[aria-label="Search"]').click()
    cy.wait('@postLoadSearch')
    cy.get('li[data-id="1"]').contains('Deli').click()
    cy.contains('Save').click()
    cy.get('[data-id="10"] > :nth-child(6)').should('contain', 'Deli')
  })
})