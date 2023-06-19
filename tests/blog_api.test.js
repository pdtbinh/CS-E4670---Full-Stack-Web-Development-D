const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('4.8: Blog list tests, step 1', () => {
    test('/api/blogs response has JSON format and 6 blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })
})

describe('4.9: Blog list tests, step 2', () => {
    test('blog post should be defined by id', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('4.10: Blog list tests, step 3', () => {
    test('POST /api/blogs response should add blog to list in the correct format', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'somelink.com',
            likes: 1,
        }
        const POST_response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        delete POST_response.body.id
        expect(POST_response.body).toEqual(newBlog)

        const GET_response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(GET_response.body.length).toBe(helper.initialBlogs.length + 1)
    })
})

describe('4.11: Blog list tests, step 4', () => {
    test('likes equal 0 if missing from request body', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'somelink.com',
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        delete response.body.id
        expect(response.body).toEqual({ ...newBlog, likes: 0 })
    })
})

describe('4.12: Blog list tests, step 4', () => {
    test('response status code is 400 if title or url is missing from request body', async () => {
        const newBlog = {
            author: 'Test Author',
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

