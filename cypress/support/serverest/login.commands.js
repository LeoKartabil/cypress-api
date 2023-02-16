Cypress.Commands.add('validAdminLogin', () => {
    cy.getAllUsers()
    cy.get('@response').then( res => {
        res.body.usuarios.every(user => {
            if (user.administrador === "true") {
                cy.wrap({ email: user.email, password: user.password}).as('adminUserTologin')
                return false
            } else {
                throw new Error('No admin user ever founded in database.')
            }
        });
    })

    cy.get('@adminUserTologin').then(user => {
        cy.api({
            method: 'POST',
            url: `/login`,
            followRedirect: false,
            failOnStatusCode: true,
            body: user
        }).then( response => {
            expect(response.body.message).to.be.equal('Login realizado com sucesso')
            expect(response.body).to.haveOwnProperty('authorization')
            Cypress.env('bearerToken', response.body.authorization)
        })
    })
    
})