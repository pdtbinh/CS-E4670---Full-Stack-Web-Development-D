const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
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
    const users = await User.find({})
    const user = users[0]
    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()

    // Add blog to user.blogs
    user.blogs = user.blogs.concat(savedBlog._id)
    user.save()

    // Respond
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params
    const deleted = await Blog.findByIdAndRemove(id)
    if (deleted)
        response.status(204).end()
    else
        response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = { title, author, url, likes }
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updated)
        response.status(200).json(updated)
    else
        response.status(404).end()
})

module.exports = blogsRouter