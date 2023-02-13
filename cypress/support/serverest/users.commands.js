Cypress.Commands.add('getAllUsers', () => {
    console.log(this)
    cy.api({
        method: 'GET',
        url: `/usuarios`,
        followRedirect: false,
        failOnStatusCode: true
    }).then( response => {
        cy.wrap(response).as('response')
    })
})

Cypress.Commands.add('validateGetAllUsers', () => {
    cy.get("@response").then(({status, body}) => { 
        expect(status).to.be.eq(200)
        cy.schemaValidation(body, 'getAllUsers', 200)
    })
})

Cypress.Commands.add('postRandomUser', (admin = true, failOnStatusCode = true) => {
    cy.randomData().then( random => {
        cy.wrap({
            nome: random.name,
            email: random.email,
            password: random.password,
            administrador: 'true'
        }).as('user')
    })

    cy.get('@user').then( user => {
        cy.api({
            method: 'POST',
            url: `/usuarios`,
            followRedirect: false,
            failOnStatusCode: failOnStatusCode,
            body: user
        }).then( response => {
            cy.wrap(response).as('response')
        })
    })
    
})

Cypress.Commands.add('validatePostValidRandomUser', () => {
    cy.get("@response").then(({status, body}) => { 
        expect(status).to.be.eq(201)
        cy.schemaValidation(body, 'postUser', 201)
    })
})

Cypress.Commands.add('savePostedUserId', () => {
    cy.get("@response").then( res => { Cypress.env('lastUserPostedId', res.body._id) })
})

Cypress.Commands.add('deleteLastUserPosted', () => {
    cy.api({
        method: 'DELETE',
        url: `/usuarios/${Cypress.env('lastUserPostedId')}`,
        followRedirect: false,
        failOnStatusCode: true
    }).then( response => {
        cy.wrap(response).as('response')
    })
})

Cypress.Commands.add('validateDeleteLastUserPosted', () => {
    cy.get("@response").then(({status, body}) => { 
        expect(status).to.be.eq(200)
        cy.schemaValidation(body, 'deleteUser', 200)
        expect(body.message).to.be.eq('Registro excluído com sucesso')
    })
})