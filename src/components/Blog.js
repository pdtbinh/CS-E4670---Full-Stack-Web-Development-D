import { useState } from "react"

const Blog = ({ blog }) => {

  console.log(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [hidden, setHidden] = useState(true)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}

      {hidden && <button onClick={() => setHidden(false)}>View</button>}
      
      {hidden || (
        <>
          <button onClick={() => setHidden(true)}>Hide</button>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </>
      )}
    </div>
  )
}

export default Blog