import { Link } from "react-router-dom"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/Comments.css"

function Comments({ comments }) {
    return (
        <section className="comments">
            <h3 className="commentsTitle">Comments</h3>
            <div className="commentsList">
                {comments.map(comment => (
                    <article key={comment.id} className="comment">
                        <Link to={`/profile/${comment.author}`}>
                            <img className="commentAvatar" src={profilePlaceholder} alt={comment.author} />
                        </Link>
                        <div className="commentBody">
                            <Link to={`/profile/${comment.author}`} className="commentAuthor">
                                {comment.author}
                            </Link>
                            <p className="commentText">{comment.text}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Comments
