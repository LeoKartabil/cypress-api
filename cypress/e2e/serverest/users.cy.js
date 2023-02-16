
describe('Testing the /usuarios route in serverest api.', () => {
    context('For every request must be validate its json schema', () => {
        it('Must get all the registered users and validate', () => {
            cy.getAllUsers()
            cy.validateGetAllUsers()
        })
    
        it('Must post a new valid admin random user, validate and save his _id', () => {
            cy.postValidRandomAdminUser()
            cy.validatePostValidRandomAdminUser()
            cy.savePostedUserId()
        })

        it('Must get the last user posted by its _id and validate', () => {
            cy.getLastUserPosted()
            cy.validateGetLastUserPosted()
        })

        it('Must put new informations for the last user posted', () => {
            cy.putNewInfosForLastUserPosted()
        })
    
        it('Must delete the last valid admin random user registered and validate', () => {
            cy.deleteLastUserPosted()
            cy.validateDeleteLastUserPosted()
        })
    })
})  


