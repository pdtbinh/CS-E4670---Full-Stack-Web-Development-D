import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {

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
      setBlogs(newBlogs)
    } catch {
      // exception handling for this function is not required in the exercises
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
        </>
      )}
    </div>
  )
}

export default Blog