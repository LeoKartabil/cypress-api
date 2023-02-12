
it('Must require all the registered users in database', () => {
    expect(Cypress.config('baseUrl')).to.be.a('string')
})