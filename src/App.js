import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogsService from './services/blogs'
import { ErrorMessage, SuccessMessage } from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        blogService.getAll().then(data => {
            const blogs = [ ...data ]
            blogs.sort((blog, anotherBlog) => anotherBlog.likes - blog.likes)
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogsService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            {success && <SuccessMessage message={success}/>}
            {error && <ErrorMessage message={error}/>}
            {
                (!user
                  && <LoginForm
                      setUser={setUser}
                      setSuccess={setSuccess}
                      setError={setError}
                  />)
                || <BlogList
                    blogs={blogs}
                    setBlogs={setBlogs}
                    user={user}
                    setUser={setUser}
                    setSuccess={setSuccess}
                    setError={setError}
                />
            }
        </div>)
}

export default App