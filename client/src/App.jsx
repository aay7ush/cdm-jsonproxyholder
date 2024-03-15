import { useEffect, useState } from 'react'

const App = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [comments, setComments] = useState([])

  const API_BASE_URL = 'http://localhost:1338'

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  const handlePostClick = (postId) => {
    fetch(`${API_BASE_URL}/posts/${postId}`)
      .then((res) => res.json())
      .then((post) => {
        setSelectedPost(post)
        fetch(`${API_BASE_URL}/posts/${postId}/comments`)
          .then((res) => res.json())
          .then((data) => setComments(data))
      })
  }

  return (
    <section className="max-w-3xl mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-2">Posts</h1>

      <ul className="space-y-5">
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="rounded-lg shadow-md transition duration-300 hover:shadow-xl px-5 py-3"
          >
            <h2 className="text-xl font-medium text-indigo-600 hover:text-indigo-800 transition duration-300 cursor-pointer">
              {post.title}
            </h2>

            {selectedPost && selectedPost.id === post.id && (
              <div className="my-2 space-y-3">
                <p className="text-gray-700">{selectedPost.body}</p>
                <h3 className="text-lg font-medium text-indigo-600">
                  Comments:
                </h3>
                <ul className="space-y-3">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="bg-indigo-50 rounded-lg p-4"
                    >
                      {comment.body}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App
