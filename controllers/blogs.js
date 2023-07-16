const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    // Initial checks
    if (!request.body.likes) request.body.likes = 0
    if (!request.body.title || !request.body.url) return response.status(400).end()
    
    // Create blog
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()

    // Add blog to user.blogs
    user.blogs = user.blogs.concat(savedBlog._id)
    user.save()

    // Respond
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

    if (blog.user._id.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'unauthorized request' })
    }
    const deleted = await Blog.findByIdAndRemove(request.params.id)
    if (deleted)
        response.status(204).end()
    else
        response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes, user } = request.body
    const blog = { title, author, url, likes, user: user.id }
    const updated = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', { username: 1, name: 1 })
    if (updated)
        response.status(200).json(updated)
    else
        response.status(404).end()
})

module.exports = blogsRouter