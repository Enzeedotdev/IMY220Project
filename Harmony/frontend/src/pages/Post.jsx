import { useParams } from "react-router-dom"
import Navigation from "../components/Navigation.jsx"
import Post from "../components/Post.jsx"
import Comments from "../components/Comments.jsx"
import EditPostForm from "../components/EditPostForm.jsx"
import imagePlaceholder from "../assets/imagePlaceholder.jpg"
import "../css/PostPage.css"

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

const comments = [
    { id: 1, postId: 1, author: "jamie.smith", text: "This is stunning!" },
    { id: 2, postId: 1, author: "morgan.lee", text: "Love the colors here" },
    { id: 3, postId: 2, author: "alex.rodriguez", text: "That ridge line is unreal" },
    { id: 4, postId: 3, author: "jamie.smith", text: "Same energy every morning" },
]

function PostPage() {
    const { postId } = useParams()
    const id = Number(postId)

    let post
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === id) {
            post = posts[i]
            break
        }
    }

    const postComments = []
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].postId === id) {
            postComments.push(comments[i])
        }
    }

    return (
        <>
            <Navigation />
            <div className="postPage">
                <div className="postPageBody">
                    <div className="postPageLeft">
                        <Post post={post} />

                        <EditPostForm />
                    </div>

                    <div className="postPageRight">
                        <Comments comments={postComments} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostPage
