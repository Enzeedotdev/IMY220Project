import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Navigation from "../components/Navigation.jsx"
import Profile from "../components/Profile.jsx"
import EditProfileForm from "../components/EditProfileForm.jsx"
import CreatePostForm from "../components/CreatePostForm.jsx"
import AlbumForm from "../components/AlbumForm.jsx"
import UserPosts from "../components/UserPosts.jsx"
import FriendsList from "../components/FriendsList.jsx"
import "../css/ProfilePage.css"

function ProfilePage() {
    const params = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const id = params.id || user._id
    const isMe = id === user._id

    const [profile, setProfile] = useState(null)
    const [me, setMe] = useState(null)
    const [posts, setPosts] = useState([])
    const [albums, setAlbums] = useState([])
    const [users, setUsers] = useState([])

    async function loadData() {
        const profileData = await fetch("/api/users/" + id).then(response => response.json())
        const meData = await fetch("/api/users/" + user._id).then(response => response.json())
        const postsData = await fetch("/api/users/" + id + "/posts").then(response => response.json())
        const albumsData = await fetch("/api/users/" + id + "/albums").then(response => response.json())
        const usersData = await fetch("/api/users").then(response => response.json())
        setProfile(profileData.user)
        setMe(meData.user)
        setPosts(postsData.posts)
        setAlbums(albumsData.albums)
        setUsers(usersData.users)
    }

    useEffect(() => {
        loadData()
    }, [id])

    async function sendRequest() {
        await fetch("/api/users/" + id + "/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id }),
        })
        loadData()
    }

    async function acceptRequest(otherId) {
        await fetch("/api/users/" + user._id + "/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: otherId }),
        })
        loadData()
    }

    async function unfriend() {
        await fetch("/api/users/" + user._id + "/friends/" + id, { method: "DELETE" })
        loadData()
    }

    async function deleteProfile() {
        await fetch("/api/users/" + user._id, { method: "DELETE" })
        localStorage.removeItem("user")
        navigate("/")
    }

    if (!profile || !me) {
        return null
    }

    const friends = users.filter(u => profile.friends.includes(u._id))
    const requests = users.filter(u => me.requests.includes(u._id))

    let friendButton = null
    if (!isMe) {
        if (profile.friends.includes(user._id)) {
            friendButton = <button onClick={unfriend}>Unfriend</button>
        } else if (me.requests.includes(id)) {
            friendButton = <button onClick={() => acceptRequest(id)}>Accept Friend Request</button>
        } else if (profile.requests.includes(user._id)) {
            friendButton = <span>Friend request sent</span>
        } else {
            friendButton = <button onClick={sendRequest}>Add Friend</button>
        }
    }

    return (
        <>
            <Navigation />
            <div className="profilePage">
                <div className="profilePageBody">
                    <aside className="profilePageLeft">
                        <Profile user={profile} postsCount={posts.length} />

                        {friendButton}

                        {isMe && <EditProfileForm user={profile} onDone={loadData} />}
                        {isMe && <button onClick={deleteProfile}>Delete Profile</button>}

                        {isMe && <CreatePostForm onDone={loadData} />}
                        {isMe && <AlbumForm onDone={loadData} />}

                        {isMe && (
                            <section className="profilePageSection">
                                <h2 className="profilePageSectionTitle">Friend Requests</h2>
                                {requests.map(u => (
                                    <div key={u._id}>
                                        <span>{u.username}</span>
                                        <button onClick={() => acceptRequest(u._id)}>Accept</button>
                                    </div>
                                ))}
                            </section>
                        )}

                        <section className="profilePageSection">
                            <h2 className="profilePageSectionTitle">Friends</h2>
                            <FriendsList friends={friends} />
                        </section>
                    </aside>

                    <section className="profilePageRight">
                        <h2 className="profilePageSectionTitle">Posts</h2>
                        <UserPosts posts={posts} />

                        <h2 className="profilePageSectionTitle">Albums</h2>
                        {albums.map(album => (
                            <Link key={album._id} to={`/album/${album._id}`}>
                                <h3>{album.name}</h3>
                                <p>{album.description}</p>
                            </Link>
                        ))}
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
