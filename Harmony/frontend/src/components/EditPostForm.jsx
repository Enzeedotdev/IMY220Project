import { useState } from "react"
import "../css/EditPostForm.css"

function EditPostForm({ post, onDone }) {
  const [description, setDescription] = useState(post.description)
  const [hashtags, setHashtags] = useState(post.hashtags.join(" "))

  async function handleSubmit(event) {
    event.preventDefault()
    await fetch("/api/posts/" + post._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, hashtags: hashtags.split(" ") }),
    })
    onDone()
  }

  return (
    <form className="editPostForm" onSubmit={handleSubmit}>
      <label className="editPostFormLabel">
        Caption
        <textarea name="caption" value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="editPostFormTextarea"
          rows={3}
        />
      </label>

      <label className="editPostFormLabel">
        Hashtags (separated by spaces)
        <input type="text" name="hashtags" value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="editPostFormInput"
        />
      </label>

      <button type="submit" className="editPostFormButton">
        Save Changes
      </button>
    </form>
  )
}

export default EditPostForm
