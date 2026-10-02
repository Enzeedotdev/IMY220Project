import { Link } from "react-router-dom"
import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/FriendCard.css"

function FriendCard({ friend }) {
    return (
        <Link to={`/profile/${friend._id}`} className="friendCard">
            <img className="friendCardAvatar" src={profilePlaceholder} alt={friend.username} />
            <span className="friendCardUsername">{friend.username}</span>
        </Link>
    )
}

export default FriendCard
