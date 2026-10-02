import { Link } from "react-router-dom"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/PostPreview.css"

function PostPreview({ post }) {
    return (
        <article className="postPreview">
            <Link to={`/profile/${post.author}`} className="postPreviewHeader">
                <img className="postPreviewAvatar" src={profilePlaceholder} alt={post.author} />
                <span className="postPreviewAuthor">{post.author}</span>
            </Link>
            <Link to={`/post/${post.id}`} className="postPreviewLink">
                <img className="postPreviewImage" src={post.imageUrl} alt={post.caption} />
                <p className="postPreviewCaption">{post.caption}</p>
                <span className="postPreviewLikes">{post.likes} likes</span>
            </Link>
        </article>
    )
}

export default PostPreview
