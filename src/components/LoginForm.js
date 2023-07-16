import { useState } from 'react'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setSuccess, setError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogsService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setSuccess('Login successful')
            setTimeout(() => setSuccess(null), 5000)
        } catch (exception) {
            setError('Wrong user name or password')
            setTimeout(() => setError(null), 5000)
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
}

export default LoginForm