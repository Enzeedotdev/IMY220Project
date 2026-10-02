import PostPreview from "./PostPreview.jsx"
import "../css/UserPosts.css"

function UserPosts({ posts }) {
    return (
        <div className="userPosts">
            {posts.map(post => (
                <PostPreview key={post._id} post={post} />
            ))}
        </div>
    )
}

export default UserPosts
