import { Link } from "react-router-dom"
import Image from "./Image.jsx"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/Post.css"

function Post({ post }) {
    return (
        <article className="post">
            <Link to={`/profile/${post.author}`} className="postHeader">
                <img className="postAvatar" src={profilePlaceholder} alt={post.author} />
                <div className="postHeaderInfo">
                    <span className="postAuthor">{post.author}</span>
                    <span className="postTimestamp">{post.timestamp}</span>
                </div>
            </Link>

            <Image src={post.imageUrl} alt={post.caption} />

            <div className="postBody">
                <p className="postCaption">
                    <span className="postCaptionAuthor">{post.author}</span>
                    {post.caption}
                </p>
                <span className="postLikes">{post.likes} likes</span>
            </div>
        </article>
    )
}

export default Post
