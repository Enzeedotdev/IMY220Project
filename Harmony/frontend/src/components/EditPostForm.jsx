import "../css/EditPostForm.css"

function EditPostForm() {
  return (
    <form className="editPostForm">
      <label className="editPostFormLabel">
        Image URL
        <input type="text" name="imageUrl"
          className="editPostFormInput"
        />
      </label>

      <label className="editPostFormLabel">
        Caption
        <textarea name="caption"
          className="editPostFormTextarea"
          rows={3}
        />
      </label>

      <button type="submit" className="editPostFormButton">
        Save Changes
      </button>
    </form>
  )
}

export default EditPostForm
