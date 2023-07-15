import { useState } from 'react'
import blogsService from '../services/blogs'

const AddBlog = ({ blogs, setBlogs, setSuccess, setError, setShowBlogForm }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const create = async (evt) => {
        try {
            evt.preventDefault()
            const blog = await blogsService.create({ title, author, url })
            setBlogs([...blogs, blog])
            setTitle('')
            setAuthor('')
            setUrl('')
            setShowBlogForm(false)
            setSuccess(`A new blog ${title} by ${author} added`)
            setTimeout(() => setSuccess(null), 5000)
        } catch {
            setError('An error occur, please try again')
            setTimeout(() => setError(null), 5000)
        }
    }

    return (
        <div>
            <form onSubmit={create}>
                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AddBlog