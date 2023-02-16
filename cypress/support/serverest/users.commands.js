/** Section for GET methods commands: */
    Cypress.Commands.add('getAllUsers', () => {
        cy.api({
            method: 'GET',
            url: `/usuarios`,
            followRedirect: false,
            failOnStatusCode: true
        }).then( response => {
            cy.wrap(response).as('response')
        })
    })

    Cypress.Commands.add('getLastUserPosted', () => {
        cy.api({
            method: 'GET',
            url: `/usuarios/${Cypress.env('lastUserPostedId')}`,
            followRedirect: false,
            failOnStatusCode: true
        }).then( response => {
            cy.wrap(response).as('response')
        })
    })

/** Section for POST methods commands: */
    Cypress.Commands.add('postValidRandomAdminUser', () => {
        cy.randomUser().then( rndUser => {
            cy.wrap({
                nome: rndUser.name,
                email: rndUser.email,
                password: rndUser.password,
                administrador: 'true'
            }).as('user')
        })

        cy.get('@user').then( user => {
            cy.api({
                method: 'POST',
                url: `/usuarios`,
                followRedirect: false,
                failOnStatusCode: true,
                body: user
            }).then( response => {
                cy.wrap(response).as('response')
            })
        })
        
    })

/** Section for PUT methods commands: */
    Cypress.Commands.add('putNewInfosForLastUserPosted', () => {
        cy.api({
            method: 'PUT',
            url: `/usuarios/${Cypress.env('lastUserPostedId')}`,
            followRedirect: false,
            failOnStatusCode: true,
            body: {
                "nome": "New user name",
                "email": "new_email@qa.com.br",
                "password": "new_password",
                "administrador": "false"
              }
        }).then( response => {
            cy.wrap(response).as('response')
        })
    })

/** Section for DELETE methods commands: */
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

/** Section for VALIDATIONS commands: */
    Cypress.Commands.add('validateGetAllUsers', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(200)
            cy.schemaValidation(body, 'getAllUsers', 200)
        })
    })

    Cypress.Commands.add('validatePostValidRandomAdminUser', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(201)
            cy.schemaValidation(body, 'postUser', 201)
        })
    })

    Cypress.Commands.add('validateDeleteLastUserPosted', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(200)
            cy.schemaValidation(body, 'deleteUser', 200)
            expect(body.message).to.be.eq('Registro excluído com sucesso')
        })
    })

    Cypress.Commands.add('validateGetLastUserPosted', () => {
        cy.get('@response').then(({status, body}) => {
            expect(status).to.be.equal(200)
            cy.schemaValidation(body, 'getUserId', 200)
            expect(body._id).to.be.equal(Cypress.env('lastUserPostedId'))
        })
    })

    Cypress.Commands.add('validateputNewInfosForLastUserPosted', () => {
        cy.get('@response').then(({status, body}) => {
            expect(status).to.be.equal(200)
            cy.schemaValidation(body, 'putUser', 200)
            expect(body._id).to.be.equal(Cypress.env('lastUserPostedId'))
        })
    })

/** Section for UTILS commands: */

    Cypress.Commands.add('savePostedUserId', () => {
        cy.get("@response").then( res => { Cypress.env('lastUserPostedId', res.body._id) })
    })



