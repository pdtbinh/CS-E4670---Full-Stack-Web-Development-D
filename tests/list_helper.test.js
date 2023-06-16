const listHelper = require('../utils/list_helper')
const seed = require('./seed')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {    
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(seed.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs, equals the sum of likes of those', () => {
        const result = listHelper.totalLikes(seed.listWithManyBlogs)
        expect(result).toBe(36)
    })
})


describe('favorite blog', () => {
    test('when list has only one blog, equals that one', () => {
        const result = listHelper.favoriteBlog(seed.listWithOneBlog)
        expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        })
    })

    test('when list has many blogs, equals the one with most likes', () => {
        const result = listHelper.favoriteBlog(seed.listWithManyBlogs)
        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})

describe('most blogs', () => {
    test('when list has only one blog, equals that one author', () => {
        const result = listHelper.mostBlogs(seed.listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('when list has many blogs, equals the one with most blogs', () => {
        const result = listHelper.mostBlogs(seed.listWithManyBlogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('when list has only one blog, equals that one author', () => {
        const result = listHelper.mostLikes(seed.listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('when list has many blogs, equals the one with most likes', () => {
        const result = listHelper.mostLikes(seed.listWithManyBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})