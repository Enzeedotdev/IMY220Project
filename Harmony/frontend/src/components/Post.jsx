import { Link } from "react-router-dom"
import Image from "./Image.jsx"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/Post.css"

function Post({ post }) {
    return (
        <article className="post">
            <Link to={`/profile/${post.owner}`} className="postHeader">
                <img className="postAvatar" src={profilePlaceholder} alt={post.username} />
                <div className="postHeaderInfo">
                    <span className="postAuthor">{post.username}</span>
                    <span className="postTimestamp">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </Link>

            <Image src={post.image} alt={post.description} />

            <div className="postBody">
                <p className="postCaption">
                    <span className="postCaptionAuthor">{post.username}</span>
                    {post.description}
                </p>
                <span className="postLikes">{post.hashtags.map(tag => "#" + tag).join(" ")}</span>
            </div>
        </article>
    )
}

export default Post
