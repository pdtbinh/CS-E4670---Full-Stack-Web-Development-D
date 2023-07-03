import Blog from "./Blog"
import blogsService from '../services/blogs'
import AddBlog from "./AddBlog"

const BlogList = ({ blogs, setBlogs, user, setUser, setSuccess, setError }) => {

    const logout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogsService.setToken(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={logout}>Logout</button>
            <AddBlog 
                blogs={blogs} 
                setBlogs={setBlogs}
                setError={setError}
                setSuccess={setSuccess}
            />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            
        </div>
    )
}

export default BlogList