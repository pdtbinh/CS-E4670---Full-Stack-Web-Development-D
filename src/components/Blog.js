import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [hidden, setHidden] = useState(true)

    const likeBlog = async () => {
        try {
            const newBlog = { ...blog, likes: blog.likes + 1 }
            await blogService.edit(blog.id, newBlog)
            const newBlogs = [ ...blogs ]
            newBlogs[blogs.indexOf(blog)] = newBlog
            newBlogs.sort((blog, anotherBlog) => anotherBlog.likes - blog.likes)
            setBlogs(newBlogs)
        } catch (err) {
            // exception handling for this function is not required in the exercises
        }
    }

    const removeBlog = async () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.remove(blog.id)
                const newBlogs = [ ...blogs ].filter(i => i.id !== blog.id)
                setBlogs(newBlogs)
            } catch (err) {
                // exception handling for this function is not required in the exercises
            }
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            {hidden && <button onClick={() => setHidden(false)}>View</button>}
            {hidden || (
                <>
                    <button onClick={() => setHidden(true)}>Hide</button>
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button onClick={() => likeBlog()}>like</button></p>
                    <p>{blog.user.name}</p>
                    {(blog.user.username === user.username) && <button onClick={() => removeBlog()}>Remove</button>}
                </>
            )}
        </div>
    )
}

export default Blog