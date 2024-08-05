describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'example.json'
    }).as('getUrls');
    // cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
    //   statusCode: 200,
    //   fixture: 'example.json'
    // }).as('postUrl');
    cy.visit('http://localhost:3000')
  })
  it('Should render a title', () => {
    cy.get('.App').should('contain', 'URL Shortener')
  })
  it('Should render a form on the page', () =>{
    cy.get('input[name="title"]').should('exist')
    cy.get('input[name="url"]').should('exist')
    cy.get('button').should('exist')
  })
  it('Should display a url shortened card', () => {
    cy.get('.url').should('contain', 'Awesome photo')
    .and('contain', 'useshorturl/1')
    .and('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })
  it('Should add a new card and be displayed on the page', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 4,
        long_url: "https://kh.wiki.gallery/images/thumb/2/2e/Woody_KHIII.png/205px-Woody_KHIII.png",
        short_url: "http://localhost:3001/useshorturl/testPost",
        title: "Jessies Girl"
      } 
    }).as('postUrl');
  
    cy.get('input[name="title"]').type('Jessies Girl');
    cy.get('input[name="url"]').type('https://kh.wiki.gallery/images/thumb/2/2e/Woody_KHIII.png/205px-Woody_KHIII.png');
    cy.get('button').click();
  
    // cy.wait('@postUrl');
  
    cy.get('.url').should('contain', 'Jessies Girl');
    cy.get('.url').should('contain', 'https://kh.wiki.gallery/images/thumb/2/2e/Woody_KHIII.png/205px-Woody_KHIII.png');
  });
})