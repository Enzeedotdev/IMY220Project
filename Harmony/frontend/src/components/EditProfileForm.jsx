import "../css/EditProfileForm.css"

function EditProfileForm() {
  return (
    <form className="editProfileForm">
      <label className="editProfileFormLabel">
        Name
        <input type="text" name="name"
          className="editProfileFormInput"
        />
      </label>

      <label className="editProfileFormLabel">
        Username
        <input type="text" name="username"
          className="editProfileFormInput"
        />
      </label>

      <label className="editProfileFormLabel">
        Email
        <input type="email" name="email"
          className="editProfileFormInput"
        />
      </label>

      <label className="editProfileFormLabel">
        Bio
        <textarea name="bio"
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
