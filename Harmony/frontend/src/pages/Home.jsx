import Navigation from "../components/Navigation.jsx"
import PostPreview from "../components/PostPreview.jsx"
import SearchInput from "../components/SearchInput.jsx"
import imagePlaceholder from "../assets/imagePlaceholder.jpg"
import "../css/Home.css"

const posts = [
    {
        id: 1,
        author: "alex.rodriguez",
        caption: "Golden hour never disappoints",
        imageUrl: imagePlaceholder,
        likes: 42,
        timestamp: "2h ago",
    },
    {
        id: 2,
        author: "jamie.smith",
        caption: "Weekend hike done right",
        imageUrl: imagePlaceholder,
        likes: 108,
        timestamp: "5h ago",
    },
    {
        id: 3,
        author: "morgan.lee",
        caption: "Coffee first, thoughts later",
        imageUrl: imagePlaceholder,
        likes: 15,
        timestamp: "1d ago",
    },
]

function Home () {
    return (
        <>
            <Navigation/>
            <div className="homeMain">
                <div className="homeHeader">
                    <h1 className="homeTitle">Your feed</h1>
                    <SearchInput placeholder="Search posts..." />
                </div>
                <div className="homeFeed">
                    {posts.map(post => (
                        <PostPreview key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
