describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Binh Pham',
            username: 'binh',
            password: '123'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
        cy.visit('')
    })

    it('Login form is shown (5.17)', function() {
        cy.visit('')
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login (5.18)',function() {
        it('succeeds with correct credentials', function() {
            cy.visit('')
            cy.get('input:first').type('binh')
            cy.get('input:last').type('123')
            cy.get('button:first').click()
            cy.contains('Binh Pham logged in')
        })

        it('fails with wrong credentials', function() {
            cy.visit('')
            cy.get('input:first').type('khue')
            cy.get('input:last').type('wrong password')
            cy.get('button:first').click()
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.contains('Wrong user name or password')
        })
    })

    describe('When logged in (5.19)', function() {
        beforeEach(function() {
            cy.login({ username: 'binh', password: '123' })
        })

        it('A blog can be created', function() {
            cy.contains('New blog').click()
            cy.get('#title').type('Harry Porter')
            cy.get('#author').type('JKR')
            cy.get('#url').type('abc.com')
            cy.contains('Create').click()
            cy.contains('Harry Porter JKR')
            cy.contains('View')
        })
    })
})