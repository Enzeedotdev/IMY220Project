import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Navigation from "../components/Navigation.jsx"
import PostPreview from "../components/PostPreview.jsx"
import "../css/Home.css"

function Home () {
    const user = JSON.parse(localStorage.getItem("user"))
    const [feed, setFeed] = useState("local")
    const [posts, setPosts] = useState([])
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        let url = "/api/feed/global"
        if (feed === "local") {
            url = "/api/feed/local/" + user._id
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPosts(data.posts)
                setAlbums(data.albums)
            })
    }, [feed])

    return (
        <>
            <Navigation/>
            <div className="homeMain">
                <div className="homeHeader">
                    <h1 className="homeTitle">Your feed</h1>
                </div>
                <button onClick={() => setFeed("local")}>Local</button>
                <button onClick={() => setFeed("global")}>Global</button>
                <div className="homeFeed">
                    {albums.map(album => (
                        <Link key={album._id} to={`/album/${album._id}`}>
                            <h3>{album.name}</h3>
                            <p>{album.description}</p>
                            <p>by {album.username}</p>
                        </Link>
                    ))}
                    {posts.map(post => (
                        <PostPreview key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
