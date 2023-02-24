
describe('Testing the /usuarios route in serverest api.', () => {
    it('Must get all the registered users and validate', () => {
        cy.getAllUsers()
        cy.validateGetAllUsers()
        cy.screenshot('all_registered_users_evidence')
    })

    it('Must post a new valid admin random user, validate and save his _id', () => {
        cy.postValidRandomAdminUser()
        cy.validatePostValidRandomAdminUser()
        cy.screenshot('registering_new_user_evidence')
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

    it('[error_on_purpose] Must request to a invalid url and show a error on report', () => {
        cy.api({
            method: 'GET',
            url: `/login`,
            failOnStatusCode: true
        })
    })
})  


