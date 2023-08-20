import { useState } from 'react'

const BlogForm = ({ blogs, setBlogs, setSuccess, setError, setShowBlogForm, user, create }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async (evt) => {
        try {
            evt.preventDefault()
            let blog = await create({ title, author, url })
            blog = { ...blog, user }
            setBlogs([...blogs, blog])
            setTitle('')
            setAuthor('')
            setUrl('')
            setShowBlogForm(false)
            setSuccess(`A new blog ${title} by ${author} added`)
            setTimeout(() => setSuccess(null), 5000)
        } catch (err) {
            setError('An error occur, please try again')
            setTimeout(() => setError(null), 5000)
        }
    }

    return (
        <div>
            <form onSubmit={createBlog}>
                <div>
                    title
                    <input
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        id="author"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        id="url"
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

export default BlogForm