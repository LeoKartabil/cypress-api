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

    Cypress.Commands.add('getLastProductPosted', () => {
        cy.api({
            method: 'GET',
            url: `/produtos/${Cypress.env('productId')}`,
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

/** Section for DELETE methods commands: */
    Cypress.Commands.add('deleteLastProduct', () => {
        const authorization = Cypress.env('bearerToken')
        cy.api({
            method: 'DELETE',
            url: `/produtos/${Cypress.env('productId')}`,
            followRedirect: false,
            failOnStatusCode: true,
            headers: {
                authorization
            }
            
        }).then( response => {
            cy.wrap(response).as('response')
        })
    })

/** Section for VALIDATIONS commands: */
    Cypress.Commands.add('validateGetAllProducts', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(200)
            cy.schemaValidation(body, 'getAllProducts', 200)
        })
    })

    Cypress.Commands.add('validatePostNewProduct', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(201)
            cy.schemaValidation(body, 'postProduct', 201)
            expect(body.message).to.be.equal('Cadastro realizado com sucesso')
        })
    })

    Cypress.Commands.add('validateGetLastProductPosted', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(200)
            cy.schemaValidation(body, 'getProductId', 200)
        })
    })

    Cypress.Commands.add('validateDeleteLastProduct', () => {
        cy.get("@response").then(({status, body}) => { 
            expect(status).to.be.eq(200)
            cy.schemaValidation(body, 'deleteProduct', 200)
        })
    })

/** Section for UTILS commands: */
    Cypress.Commands.add('saveNewProductId', () => {
        cy.get("@response").then(response => { 
            Cypress.env('productId', response.body._id)
        })
    })