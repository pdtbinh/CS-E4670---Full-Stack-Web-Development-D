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

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'binh', password: '123' })
        })

        it('A blog can be created (5.19)', function() {
            cy.contains('New blog').click()
            cy.get('#title').type('Harry Porter')
            cy.get('#author').type('JKR')
            cy.get('#url').type('abc.com')
            cy.contains('Create').click()
            cy.contains('A new blog Harry Porter by JKR added')
            // Check new blog is added to list of all blogs
            cy.contains('Harry Porter JKR')
            cy.contains('View')
        })

        it('A blog can be liked (5.20)', function() {
            cy.createBlog({ title: 'Harry Porter', author: 'JKR', url: 'abc.com' })
            cy.contains('View').click()
            // Like once, number of like becomes 1
            cy.get('.like').click()
            cy.contains('1')
        })

        it('A blog can be deleted (5.21)', function() {
            cy.createBlog({ title: 'Harry Porter', author: 'JKR', url: 'abc.com' })
            cy.contains('Harry Porter JKR')
            cy.contains('View').click()
            cy.contains('Remove').click()
            cy.should('not.contain', 'Harry Porter JKR')
        })
    })

    describe('When logged in as another user (5.22)', function() {
        beforeEach(function() {
            cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
            const user_1 = {
                name: 'Binh Pham', username: 'binh', password: '123'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user_1)
            const user_2 = {
                name: 'Khue Nguyen', username: 'khue', password: '123'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user_2)
            cy.login({ username: 'binh', password: '123' })
            cy.createBlog({ title: 'Harry Porter', author: 'JKR', url: 'abc.com' })
            cy.login({ username: 'khue', password: '123' })
        })

        it('Cannot delete blog created by another user', function() {
            cy.contains('View').click()
            cy.get('#remove').should('not.exist')
        })
    })


    describe('When logged in (5.23)', function() {
        beforeEach(function() {
            cy.login({ username: 'binh', password: '123' })
        })

        it('Blogs are ordered by likes', function() {
            // Create 3 blogs that have: 3 likes, 2 likes, 1 likes, respectively
            cy.createBlog({ title: '1-like book', author: 'NK', url: '123.com' })
            cy.createBlog({ title: '2-like book', author: 'NK', url: '123.com' })
            cy.createBlog({ title: '3-like book', author: 'NK', url: '123.com' })

            // Show like buttons, after every view click,
            // the next view button becomes the first view button.
            // Because the clicked button became the "hide" button.
            cy.get('#view').eq(0).click()
            cy.get('#view').eq(0).click()
            cy.get('#view').eq(0).click()

            // Click likes
            // - First button, 1 like
            cy.wait(2000).get('.like').eq(0).click()
            // - Second button, 2 like
            cy.wait(2000).get('.like').eq(1).click()
            cy.wait(2000).get('.like').eq(1).click()
            // - Third button, 3 like
            cy.wait(2000).get('.like').eq(2).click()
            cy.wait(2000).get('.like').eq(2).click()
            cy.wait(2000).get('.like').eq(1).click()

            // Check orders
            cy.get('.blog').eq(0).should('contain', '3-like book NK')
            cy.get('.blog').eq(1).should('contain', '2-like book NK')
            cy.get('.blog').eq(2).should('contain', '1-like book NK')
        })
    })
})