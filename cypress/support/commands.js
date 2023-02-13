// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * EN: The command cy.schemaValidation() should be used for contract validation.
 *   It is necessary to install the AJV to work (https://github.com/epoberezkin/ajv#installation)
 *   The for loop is responsible for creating the list of errors of the contract validation that is displayed alongside the error message.
 *   To generate the schemas I usually use the tool JSON-SCHEMA: https://www.jsonschema.net/home.
 *
 * PT-BR: O comando cy.schemaValidation() deve ser utilizado para validações de contrato.
 *   É necessário a instalação do AJV para que o comando funcione: https://github.com/epoberezkin/ajv#installation
 *   O laço for é o responsável por criar a lista com os erros da validação do contrato que é mostrado junto a mensagem de erro.
 *   Para gerar os schemas das respostas eu costumo utilizar a ferramenta JSON-SCHEMA: https://www.jsonschema.net/home nela é possivel
 * escolher exatamente quais campos você quer trazer para seu schema.
 *  Mantenha a organização dos schemas na pasta fixtures, a estrutura e o comando funcionam juntas!
 *  Em caso de dúvidas consulte a chamada deste comando no arquivo 'global.step.js'
 * 
 * Autor: Leonardo Kartabil - Compass.uol
*/

import Ajv, { stringify } from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add('schemaValidation', (res, schema, status) => {
    cy.fixture(`schemas/${schema}/${status}.json`).then( schemaFixture => {
        const validate = ajv.compile(schemaFixture)
        const valid = validate(res)
        if (!valid) {
            var errors = ''
            for (let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            throw new Error('Error validating schema, please verify!' + errors)
        }
        cy.log(`>> Schema successfully validated via file schema/${schema}/${status}.json`)
    })
})

Cypress.Commands.add('randomData', () => {
    const randomInt = Math.floor(Math.random() * 1000);
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const randomLetter = caracteres.charAt(Math.random() * (25 - 0) + 0)

    return {
        name: `Rick ${randomLetter}-${randomInt}`,
        email: `rick${randomLetter}-${randomInt}@intergalacticmail.com`,
        password: `${randomInt}_shut_up_M0rty`,
    }
})