
describe('Testing the /produtos route in serverest api.', () => {

    it('Must get all products and validate', () => {
        cy.getAllProducts()
        cy.validateGetAllProducts()
    })

    context('Logged in', () => {

        before('Login with admin user', () => {
            cy.validAdminLogin() //token saved as 'bearerToken' in environment variables
        })

        it('Must post a new product and validate', () => {
            cy.postNewProduct()
            //cy.validatePostNewProduct()
        })
    
    })
})  