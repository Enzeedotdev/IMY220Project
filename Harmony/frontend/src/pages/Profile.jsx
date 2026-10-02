import Navigation from "../components/Navigation.jsx"
import Profile from "../components/Profile.jsx"
import EditProfileForm from "../components/EditProfileForm.jsx"
import CreatePostForm from "../components/CreatePostForm.jsx"
import UserPosts from "../components/UserPosts.jsx"
import FriendsList from "../components/FriendsList.jsx"
import imagePlaceholder from "../assets/imagePlaceholder.jpg"
import "../css/ProfilePage.css"

const userPosts = [
    {
        id: 1,
        author: "alex.rodriguez",
        caption: "Golden hour never disappoints",
        imageUrl: imagePlaceholder,
        likes: 42,
        timestamp: "2h ago",
    },
]

const friends = [
    {
        id: 2,
        username: "jamie.smith",
        name: "Jamie Smith",
        bio: "Trails, peaks, and everything in between.",
        email: "jamie.smith@example.com",
    },
    {
        id: 3,
        username: "morgan.lee",
        name: "Morgan Lee",
        bio: "Coffee first, thoughts later.",
        email: "morgan.lee@example.com",
    },
]

const user = {
    id: 1,
    username: "alex.rodriguez",
    name: "Alex Rodriguez",
    bio: "Chasing golden hour and good coffee.",
    email: "alex.rodriguez@example.com",
    postsCount: userPosts.length,
    friendsCount: friends.length,
}

function ProfilePage() {
    return (
        <>
            <Navigation />
            <div className="profilePage">
                <div className="profilePageBody">
                    <aside className="profilePageLeft">
                        <Profile user={user} />

                        <EditProfileForm />

                        <CreatePostForm />

                        <section className="profilePageSection">
                            <h2 className="profilePageSectionTitle">Friends</h2>
                            <FriendsList friends={friends} />
                        </section>
                    </aside>

                    <section className="profilePageRight">
                        <h2 className="profilePageSectionTitle">Posts</h2>
                        <UserPosts posts={userPosts} />
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
