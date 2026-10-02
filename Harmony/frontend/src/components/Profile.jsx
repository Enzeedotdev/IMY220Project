import profilePlaceholder from "../assets/profilePlaceholder.jpeg"
import "../css/Profile.css"

function Profile({ user, postsCount }) {
    return (
        <div className="profile">
            <img className="profileAvatar" src={profilePlaceholder} alt={user.username} />
            <div className="profileInfo">
                <h2 className="profileName">{user.username}</h2>
                <span className="profileUsername">{user.email}</span>
                <p className="profileBio">{user.bio}</p>
                <div className="profileStats">
                    <span className="profileStat"><strong>{postsCount}</strong> posts</span>
                    <span className="profileStat"><strong>{user.friends.length}</strong> friends</span>
                </div>
            </div>
        </div>
    )
}

export default Profile
