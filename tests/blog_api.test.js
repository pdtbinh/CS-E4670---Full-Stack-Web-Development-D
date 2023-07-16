require('dotenv').config()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
require('express-async-errors')

const api = supertest(app)

let auth = ''
let uid = ''
let userObj = null

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    //await Blog.insertMany(helper.initialBlogs)

    const userInfo = {
        name: 'Binh',
        username: 'binh',
        password: process.env.PASSWORD
    }

    await api
        .post('/api/users')
        .send(userInfo)

    const loginResponse = await api
        .post('/api/login')
        .send(userInfo)
    
    const userResponse = await api
        .get('/api/users')
    
    const user = userResponse.body[0]
    userObj = user
    
    auth = `Bearer ${loginResponse.body.token}`
    uid = user.id

    for (let blog of helper.initialBlogs) {
        await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(blog)
    }
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

describe('Add blog; 4.10: Blog list tests, step 3', () => {
    test('POST /api/blogs response should add blog to list in the correct format', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'somelink.com',
            likes: 1,
        }
        const POST_response = await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        delete POST_response.body.id
        expect(POST_response.body).toEqual({ ...newBlog, user: uid })

        const GET_response = await api
            .get('/api/blogs')
            .set('Authorization', auth)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(GET_response.body.length).toBe(helper.initialBlogs.length + 1)
    })
})

describe('Add blog; 4.11: Blog list tests, step 4', () => {
    test('likes equal 0 if missing from request body', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'somelink.com',
        }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        delete response.body.id
        expect(response.body).toEqual({ ...newBlog, likes: 0, user: uid })
    })
})

describe('Add blog; 4.12: Blog list tests, step 5', () => {
    test('response status code is 400 if title or url is missing from request body', async () => {
        const newBlog = {
            author: 'Test Author',
            likes: 0
        }
        await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(newBlog)
            .expect(400)
    })
})

describe('4.13: Blog list expansions, step 1', () => {
    test('deleting a single post should behave correctly', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', auth)
            .expect(204)
        
        const after_delete_response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(after_delete_response.body.length).toBe(helper.initialBlogs.length - 1)
    })
})

describe('4.14: Blog list expansions, step 2', () => {
    test('update a single post should behave correctly', async () => {
        const response = await api.get('/api/blogs')
        const blog = { ...response.body[0], likes: 70 }
        const PUT_response = await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(PUT_response.body).toEqual(blog)
        
        const after_update_response = await api
            .get('/api/blogs')
            .expect(200)
        
        expect(after_update_response.body.length).toBe(helper.initialBlogs.length) // extra test: length should be the same after update
    })
})

describe('Add blog; 4.23: bloglist expansion, step 11', () => {
    test('Unauthorized access', async () => {
        const newBlog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'somelink.com',
            likes: 1,
        }
        await api
            .post('/api/blogs')
            .set('Authorization', auth + '1')
            .send(newBlog)
            .expect(401)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

