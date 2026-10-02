import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navigation from "../components/Navigation.jsx"
import Post from "../components/Post.jsx"
import Comments from "../components/Comments.jsx"
import EditPostForm from "../components/EditPostForm.jsx"
import "../css/PostPage.css"

function PostPage() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [reason, setReason] = useState("")

    function loadPost() {
        fetch("/api/posts/" + postId)
            .then(response => response.json())
            .then(data => {
                setPost(data.post)
                setComments(data.comments)
            })
    }

    useEffect(() => {
        loadPost()
    }, [postId])

    async function deletePost() {
        await fetch("/api/posts/" + postId, { method: "DELETE" })
        navigate("/home")
    }

    async function reportPost(event) {
        event.preventDefault()
        await fetch("/api/posts/" + postId + "/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reporter: user._id, reason }),
        })
        setReason("")
    }

    if (!post) {
        return null
    }

    return (
        <>
            <Navigation />
            <div className="postPage">
                <div className="postPageBody">
                    <div className="postPageLeft">
                        <Post post={post} />

                        {post.owner === user._id && <EditPostForm post={post} onDone={loadPost} />}
                        {post.owner === user._id && <button onClick={deletePost}>Delete Post</button>}

                        <form onSubmit={reportPost}>
                            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for reporting" />
                            <button type="submit">Report Post</button>
                        </form>
                    </div>

                    <div className="postPageRight">
                        <Comments comments={comments} postId={postId} onDone={loadPost} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostPage
