import Blog from "./Blog"
import blogsService from '../services/blogs'
import AddBlog from "./AddBlog"
import { useState } from "react"

const BlogList = ({ blogs, setBlogs, user, setUser, setSuccess, setError }) => {

    const logout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogsService.setToken(null)
    }

    const [showBlogForm, setShowBlogForm] = useState(false)

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            {/* It makes sense that the logout button is in the blog list, 
            because the blog list only appears when the user is logged in. */}
            <button onClick={logout}>Logout</button>
            <div>
                {
                    showBlogForm ? (<>
                        <AddBlog 
                            blogs={blogs} 
                            setBlogs={setBlogs}
                            setError={setError}
                            setSuccess={setSuccess}
                            setShowBlogForm={setShowBlogForm}
                        />
                        <button onClick={() => setShowBlogForm(false)}>
                            Cancel
                        </button>
                    </>) 
                    : <button onClick={() => setShowBlogForm(true)}>
                        New blog
                    </button>
                }
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            
        </div>
    )
}

export default BlogList