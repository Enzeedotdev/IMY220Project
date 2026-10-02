import { useState } from "react"
import "../css/CreatePostForm.css"

// Creates an album, or edits one when an album is passed in
function AlbumForm({ album, onDone }) {
  const user = JSON.parse(localStorage.getItem("user"))
  const [name, setName] = useState(album ? album.name : "")
  const [description, setDescription] = useState(album ? album.description : "")
  const [hashtags, setHashtags] = useState(album ? album.hashtags.join(" ") : "")

  async function handleSubmit(event) {
    event.preventDefault()

    if (album) {
      await fetch("/api/albums/" + album._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, hashtags: hashtags.split(" ") }),
      })
    } else {
      await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: user._id,
          username: user.username,
          name,
          description,
          hashtags: hashtags.split(" "),
        }),
      })
      setName("")
      setDescription("")
      setHashtags("")
    }

    onDone()
  }

  return (
    <form className="createPostForm" onSubmit={handleSubmit}>
      <label className="createPostFormLabel">
        Album name
        <input type="text" value={name}
          onChange={(e) => setName(e.target.value)}
          className="createPostFormInput"
        />
      </label>

      <label className="createPostFormLabel">
        Description
        <textarea value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="createPostFormTextarea"
          rows={3}
        />
      </label>

      <label className="createPostFormLabel">
        Hashtags (separated by spaces)
        <input type="text" value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="createPostFormInput"
        />
      </label>

      <button type="submit" className="createPostFormButton">
        {album ? "Save Album" : "Create Album"}
      </button>
    </form>
  )
}

export default AlbumForm
