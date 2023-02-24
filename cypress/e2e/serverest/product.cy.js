
describe('Testing the /produtos route in serverest api.', () => {

    it('Must get all products and validate', () => {
        cy.getAllProducts()
        cy.validateGetAllProducts()
    })

    context('Logged in', () => {

        before('Login with admin user', () => {
            cy.validAdminLogin() //token saved as 'bearerToken' in environment variables
        })

        it('Must post a new product, validate and save its _id', () => {
            cy.postNewProduct()
            cy.validatePostNewProduct()
            cy.saveNewProductId()
        })

        it('Must get the last product posted by its _id', () => {
            cy.getLastProductPosted()
            cy.validateGetLastProductPosted()
        })

        it('Must delete the last product posted and validate', () => {
            cy.deleteLastProduct()
        })
    
    })
})  