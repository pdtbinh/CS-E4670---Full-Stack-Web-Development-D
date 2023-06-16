const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog)

const mostBlogs = (blogs) => {
    if (blogs.length < 1) return null
    const authors = {}
    blogs.map(blog => authors[blog.author] ? authors[blog.author]++ : authors[blog.author] = 1)
    const mostBlog = { blogs: 0 }
    for (let author in authors) {
        if (authors[author] >= mostBlog['blogs']) {
            mostBlog['author'] = author
            mostBlog['blogs'] = authors[author]
        }
    }
    return mostBlog
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) return null
    const authors = {}
    blogs.map(blog => authors[blog.author] ? authors[blog.author] += blog.likes : authors[blog.author] = blog.likes)
    const mostLikes = { likes: 0 }
    for (let author in authors) {
        if (authors[author] >= mostLikes['likes']) {
            mostLikes['author'] = author
            mostLikes['likes'] = authors[author]
        }
    }
    return mostLikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}