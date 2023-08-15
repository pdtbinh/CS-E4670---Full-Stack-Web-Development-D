import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog/> component', () => {

    const dummyUser = {
        username: 'khue',
        name: 'Minh Khue'
    }

    const dummyBlog = {
        title: 'The Kitty Cat',
        author: 'Minh Khue',
        url: 'http...',
        likes: 10,
        user: dummyUser
    }

    let container

    beforeEach(() => {
        container = render(
            <Blog blog={dummyBlog} user={dummyUser}/>
        ).container
    })

    test('5.13: renders title & author NOT url | likes, by default', () => {
        expect(
            screen.getByText('The Kitty Cat Minh Khue')
        ).toBeDefined()
        expect(
            container.querySelector('div')
        ).not.toHaveTextContent('http...')
        expect(
            container.querySelector('div')
        ).not.toHaveTextContent(10)
    })

    test('5.14: renders url & likes, when click show', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)
        expect(
            screen.getByText('http...')
        ).toBeDefined()
        expect(
            screen.getByText(`likes ${dummyBlog.likes}`)
        ).toBeDefined()
    })

    test('5.15: click show twice', async () => {
        const mockHandler = jest.fn()

        render(
            <Blog blog={dummyBlog} user={dummyUser} edit={mockHandler}/>
        )

        const button = screen.getAllByText('View')[1]
        const user = userEvent.setup()
        await user.click(button)

        const like = screen.getByText('like')
        await user.click(like)
        await user.click(like)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('5.16: blog form information', async () => {
        const mockHandler = jest.fn()

        render(
            <BlogForm create={mockHandler} setError={() => null}/>
        )
        const user = userEvent.setup()

        const titleInput = screen.getAllByRole('textbox')[0]
        await user.type(titleInput, 'Title Sth')

        const authorInput = screen.getAllByRole('textbox')[1]
        await user.type(authorInput, 'Author Sth')

        const urlInput = screen.getAllByRole('textbox')[2]
        await user.type(urlInput, 'Url Sth')

        const button = screen.getByText('Create')
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe('Title Sth')
        expect(mockHandler.mock.calls[0][0].author).toBe('Author Sth')
        expect(mockHandler.mock.calls[0][0].url).toBe('Url Sth')
    })
})