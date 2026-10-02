import "../css/CreatePostForm.css"

function CreatePostForm() {
  return (
    <form className="createPostForm">
      <label className="createPostFormLabel">
        Image URL
        <input type="text" name="imageUrl"
          className="createPostFormInput"
        />
      </label>

      <label className="createPostFormLabel">
        Caption
        <textarea name="caption"
          className="createPostFormTextarea"
          rows={3}
        />
      </label>

      <button type="submit" className="createPostFormButton">
        Share Post
      </button>
    </form>
  )
}

export default CreatePostForm
