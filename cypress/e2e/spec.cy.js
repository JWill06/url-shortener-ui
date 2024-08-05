describe('Rendering shortended urls', () => {
  let initialData;
  let mockPostRequest;

  beforeEach(() => {
    cy.fixture('example.json').then((data) => {
      initialData = data;
    });

    cy.fixture('postUrl.json').then((data) => {
      mockPostRequest = data.urls;
    });

    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: initialData 
    }).as('getUrls');
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: mockPostRequest
    }).as('postUrl');
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
  it('Should add a new card', () => {
    cy.get('input[name="title"]').type('Jessies Girl');
    cy.get('input[name="url"]').type('https://kh.wiki.gallery/images/thumb/2/2e/Woody_KHIII.png/205px-Woody_KHIII.png');
    cy.get('button').click();
  
    cy.wait('@postUrl');

    cy.get('.url').should('contain', 'Jessies Girl');
    cy.get('.url').should('contain', 'http://localhost:3001/useshorturl/3');
  })
})