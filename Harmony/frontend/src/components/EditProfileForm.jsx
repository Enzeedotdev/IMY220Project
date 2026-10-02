import { useState } from "react"
import "../css/EditProfileForm.css"

function EditProfileForm({ user, onDone }) {
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [bio, setBio] = useState(user.bio)

  async function handleSubmit(event) {
    event.preventDefault()
    await fetch("/api/users/" + user._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, bio }),
    })
    localStorage.setItem("user", JSON.stringify({ ...user, username, email, bio }))
    onDone()
  }

  return (
    <form className="editProfileForm" onSubmit={handleSubmit}>
      <label className="editProfileFormLabel">
        Username
        <input type="text" name="username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="editProfileFormInput"
        />
      </label>

      <label className="editProfileFormLabel">
        Email
        <input type="email" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="editProfileFormInput"
        />
      </label>

      <label className="editProfileFormLabel">
        Bio
        <textarea name="bio" value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="editProfileFormTextarea"
          rows={3}
        />
      </label>

      <button type="submit" className="editProfileFormButton">
        Save Changes
      </button>
    </form>
  )
}

export default EditProfileForm
