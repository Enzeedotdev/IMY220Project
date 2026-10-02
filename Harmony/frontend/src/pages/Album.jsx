import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navigation from "../components/Navigation.jsx"
import PostPreview from "../components/PostPreview.jsx"
import AlbumForm from "../components/AlbumForm.jsx"
import "../css/PostPage.css"

function Album() {
    const { albumId } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const [album, setAlbum] = useState(null)
    const [posts, setPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const [postToAdd, setPostToAdd] = useState("")

    async function loadAlbum() {
        const albumData = await fetch("/api/albums/" + albumId).then(response => response.json())
        const myPostsData = await fetch("/api/users/" + user._id + "/posts").then(response => response.json())
        setAlbum(albumData.album)
        setPosts(albumData.posts)
        setMyPosts(myPostsData.posts)
    }

    useEffect(() => {
        loadAlbum()
    }, [albumId])

    async function deleteAlbum() {
        await fetch("/api/albums/" + albumId, { method: "DELETE" })
        navigate("/profile")
    }

    async function addPost(event) {
        event.preventDefault()
        await fetch("/api/albums/" + albumId + "/posts/" + postToAdd, { method: "POST" })
        loadAlbum()
    }

    async function removePost(postId) {
        await fetch("/api/albums/" + albumId + "/posts/" + postId, { method: "DELETE" })
        loadAlbum()
    }

    if (!album) {
        return null
    }

    const isOwner = album.owner === user._id

    return (
        <>
            <Navigation />
            <div className="postPage">
                <div className="postPageBody">
                    <div className="postPageLeft">
                        <h1>{album.name}</h1>
                        <p>{album.description}</p>
                        <p>{album.hashtags.map(tag => "#" + tag).join(" ")}</p>
                        <p>by {album.username}</p>

                        {isOwner && <AlbumForm album={album} onDone={loadAlbum} />}
                        {isOwner && <button onClick={deleteAlbum}>Delete Album</button>}

                        {isOwner && (
                            <form onSubmit={addPost}>
                                <select value={postToAdd} onChange={(e) => setPostToAdd(e.target.value)}>
                                    <option value="">Choose one of your posts</option>
                                    {myPosts.map(post => (
                                        <option key={post._id} value={post._id}>{post.description}</option>
                                    ))}
                                </select>
                                <button type="submit">Add to Album</button>
                            </form>
                        )}
                    </div>

                    <div className="postPageRight">
                        {posts.map(post => (
                            <div key={post._id}>
                                <PostPreview post={post} />
                                {isOwner && <button onClick={() => removePost(post._id)}>Remove from Album</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Album
