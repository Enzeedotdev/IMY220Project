import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/FriendCard.css"

function FriendCard({ friend }) {
    return (
        <div className="friendCard">
            <img className="friendCardAvatar" src={profilePlaceholder} alt={friend.username} />
            <span className="friendCardUsername">{friend.username}</span>
        </div>
    )
}

export default FriendCard
