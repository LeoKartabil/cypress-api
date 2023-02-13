
describe('Testing the /usuarios route in serverest api.', () => {
    context('For every request must be validate its json schema', () => { 
        it.only('Must get all the registered users and validate', () => {
            cy.getAllUsers()
            cy.validateGetAllUsers()
        })
    
        it('Must post a new valid admin random user, validate and save his _id', () => {
            cy.postRandomUser() //By default register a admin user - option: false for no admin
            cy.validatePostValidRandomUser()
            cy.savePostedUserId()
        })
    
        it('Must delete the last valid admin random user registered and validate', () => {
            cy.deleteLastUserPosted()
            cy.validateDeleteLastUserPosted()
        })
    })
})  


