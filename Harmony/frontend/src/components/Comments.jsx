import { useState } from "react"
import { Link } from "react-router-dom"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/Comments.css"

function Comments({ comments, postId, onDone }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [text, setText] = useState("")

    async function addComment(event) {
        event.preventDefault()
        await fetch("/api/posts/" + postId + "/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ owner: user._id, username: user.username, text }),
        })
        setText("")
        onDone()
    }

    return (
        <section className="comments">
            <h3 className="commentsTitle">Comments</h3>
            <div className="commentsList">
                {comments.map(comment => (
                    <article key={comment._id} className="comment">
                        <Link to={`/profile/${comment.owner}`}>
                            <img className="commentAvatar" src={profilePlaceholder} alt={comment.username} />
                        </Link>
                        <div className="commentBody">
                            <Link to={`/profile/${comment.owner}`} className="commentAuthor">
                                {comment.username}
                            </Link>
                            <p className="commentText">{comment.text}</p>
                        </div>
                    </article>
                ))}
            </div>

            <form onSubmit={addComment}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment" />
                <button type="submit">Comment</button>
            </form>
        </section>
    )
}

export default Comments
