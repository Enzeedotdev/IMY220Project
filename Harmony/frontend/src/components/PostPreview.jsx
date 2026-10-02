import { Link } from "react-router-dom"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/PostPreview.css"

function PostPreview({ post }) {
    return (
        <article className="postPreview">
            <Link to={`/profile/${post.owner}`} className="postPreviewHeader">
                <img className="postPreviewAvatar" src={profilePlaceholder} alt={post.username} />
                <span className="postPreviewAuthor">{post.username}</span>
            </Link>
            <Link to={`/post/${post._id}`} className="postPreviewLink">
                <img className="postPreviewImage" src={post.image} alt={post.description} />
                <p className="postPreviewCaption">{post.description}</p>
            </Link>
        </article>
    )
}

export default PostPreview
