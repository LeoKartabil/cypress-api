/** Section for GET methods commands: */
    Cypress.Commands.add('getAllProducts', () => {
        cy.api({
            method: 'GET',
            url: `/produtos`,
            followRedirect: false,
            failOnStatusCode: true
        }).then( response => {
            cy.wrap(response).as('response')
        })
    })

/** Section for POST methods commands: */
    Cypress.Commands.add('postNewProduct', () => {
        const authorization = Cypress.env('bearerToken')
        cy.randomProduct()
        cy.get('@newProduct').then( product => {
            cy.api({
                method: 'POST',
                url: `/produtos`,
                followRedirect: false,
                failOnStatusCode: true,
                body: product,
                headers: {
                    authorization
                }
            }).then( response => {
                cy.wrap(response).as('response')
            })
        })
    })

/** Section for VALIDATIONS commands: */
    Cypress.Commands.add('validateGetAllProducts', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(200)
            cy.schemaValidation(body, 'getAllProducts', 200)
        })
    })