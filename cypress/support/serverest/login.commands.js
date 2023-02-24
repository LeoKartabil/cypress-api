Cypress.Commands.add('validAdminLogin', () => {
    cy.getAllUsers()
    cy.get('@response').then( res => {
        const adminUser = res.body.usuarios.find((user) => user.administrador === 'true')
        expect(adminUser).not.to.be.undefined
        cy.wrap({ email: adminUser.email, password: adminUser.password }).as('adminUserTologin')
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