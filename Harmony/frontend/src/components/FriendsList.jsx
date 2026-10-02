import FriendCard from "./FriendCard.jsx"
import "../css/FriendsList.css"

function FriendsList({ friends }) {
    return (
        <div className="friendsList">
            {friends.map(friend => (
                <FriendCard key={friend._id} friend={friend} />
            ))}
        </div>
    )
}

export default FriendsList
