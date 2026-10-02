import { useState } from "react"
import "../css/CreatePostForm.css"

function CreatePostForm({ onDone }) {
  const user = JSON.parse(localStorage.getItem("user"))
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [hashtags, setHashtags] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: user._id,
        username: user.username,
        image,
        description,
        hashtags: hashtags.split(" "),
      }),
    })
    setImage("")
    setDescription("")
    setHashtags("")
    onDone()
  }

  return (
    <form className="createPostForm" onSubmit={handleSubmit}>
      <label className="createPostFormLabel">
        Image URL
        <input type="text" name="imageUrl" value={image}
          onChange={(e) => setImage(e.target.value)}
          className="createPostFormInput"
        />
      </label>

      <label className="createPostFormLabel">
        Caption
        <textarea name="caption" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="createPostFormTextarea"
          rows={3}
        />
      </label>

      <label className="createPostFormLabel">
        Hashtags (separated by spaces)
        <input type="text" name="hashtags" value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="createPostFormInput"
        />
      </label>

      <button type="submit" className="createPostFormButton">
        Share Post
      </button>
    </form>
  )
}

export default CreatePostForm
