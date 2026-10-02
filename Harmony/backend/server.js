import express from "express"
import { MongoClient, ObjectId } from "mongodb"

const app = express()
const PORT = 3001

app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
await client.connect()
const db = client.db("harmony")

const users = db.collection("users")
const posts = db.collection("posts")
const albums = db.collection("albums")
const comments = db.collection("comments")
const reports = db.collection("reports")

//Authentication

app.post("/api/signup", async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        bio: "",
        avatar: "",
        friends: [],
        requests: [],
    }
    await users.insertOne(user)
    res.json({ user })
})

app.post("/api/signin", async (req, res) => {
    const user = await users.findOne({ email: req.body.email, password: req.body.password })
    res.json({ user })
})

app.post("/api/logout", (req, res) => {
    res.json({ msg: "Logged out" })
})

//Users (profiles)

app.get("/api/users", async (req, res) => {
    res.json({ users: await users.find().toArray() })
})

app.get("/api/users/:id", async (req, res) => {
    res.json({ user: await users.findOne({ _id: new ObjectId(req.params.id) }) })
})

app.put("/api/users/:id", async (req, res) => {
    await users.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.json({ msg: "User updated" })
})

app.delete("/api/users/:id", async (req, res) => {
    await users.deleteOne({ _id: new ObjectId(req.params.id) })
    res.json({ msg: "User deleted" })
})

app.get("/api/users/:id/posts", async (req, res) => {
    res.json({ posts: await posts.find({ owner: new ObjectId(req.params.id) }).toArray() })
})

app.get("/api/users/:id/albums", async (req, res) => {
    res.json({ albums: await albums.find({ owner: new ObjectId(req.params.id) }).toArray() })
})

//Friends

// :id is the user receiving the request, body.userId is the user sending it
app.post("/api/users/:id/request", async (req, res) => {
    await users.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $push: { requests: new ObjectId(req.body.userId) } }
    )
    res.json({ msg: "Request sent" })
})

// :id is accepting body.userID is the one who sent the request
app.post("/api/users/:id/accept", async (req, res) => {
    const me = new ObjectId(req.params.id)
    const other = new ObjectId(req.body.userId)
    await users.updateOne({ _id: me }, { $pull: { requests: other }, $push: { friends: other } })
    await users.updateOne({ _id: other }, { $push: { friends: me } })
    res.json({ msg: "Request accepted" })
})

app.delete("/api/users/:id/friends/:friendId", async (req, res) => {
    const me = new ObjectId(req.params.id)
    const friend = new ObjectId(req.params.friendId)
    await users.updateOne({ _id: me }, { $pull: { friends: friend } })
    await users.updateOne({ _id: friend }, { $pull: { friends: me } })
    res.json({ msg: "Unfriended" })
})

//Posts

app.post("/api/posts", async (req, res) => {
    await posts.insertOne({
        owner: new ObjectId(req.body.owner),
        username: req.body.username,
        image: req.body.image,
        description: req.body.description,
        hashtags: req.body.hashtags,
        createdAt: new Date(),
    })
    res.json({ msg: "Post created" })
})

// Returns the post together with its comments
app.get("/api/posts/:id", async (req, res) => {
    const id = new ObjectId(req.params.id)
    res.json({
        post: await posts.findOne({ _id: id }),
        comments: await comments.find({ post: id }).toArray(),
    })
})

app.put("/api/posts/:id", async (req, res) => {
    await posts.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.json({ msg: "Post updated" })
})

app.delete("/api/posts/:id", async (req, res) => {
    await posts.deleteOne({ _id: new ObjectId(req.params.id) })
    res.json({ msg: "Post deleted" })
})

app.post("/api/posts/:id/comments", async (req, res) => {
    await comments.insertOne({
        post: new ObjectId(req.params.id),
        owner: new ObjectId(req.body.owner),
        username: req.body.username,
        text: req.body.text,
        createdAt: new Date(),
    })
    res.json({ msg: "Comment added" })
})

app.post("/api/posts/:id/report", async (req, res) => {
    await reports.insertOne({
        post: new ObjectId(req.params.id),
        reporter: new ObjectId(req.body.reporter),
        reason: req.body.reason,
        createdAt: new Date(),
    })
    res.json({ msg: "Post reported" })
})

//Albums

app.post("/api/albums", async (req, res) => {
    await albums.insertOne({
        owner: new ObjectId(req.body.owner),
        username: req.body.username,
        name: req.body.name,
        description: req.body.description,
        hashtags: req.body.hashtags,
        posts: [],
        createdAt: new Date(),
    })
    res.json({ msg: "Album created" })
})

// Returns the album together with the posts inside it
app.get("/api/albums/:id", async (req, res) => {
    const album = await albums.findOne({ _id: new ObjectId(req.params.id) })
    res.json({
        album,
        posts: await posts.find({ _id: { $in: album.posts } }).toArray(),
    })
})

app.put("/api/albums/:id", async (req, res) => {
    await albums.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    res.json({ msg: "Album updated" })
})

app.delete("/api/albums/:id", async (req, res) => {
    await albums.deleteOne({ _id: new ObjectId(req.params.id) })
    res.json({ msg: "Album deleted" })
})

app.post("/api/albums/:id/posts/:postId", async (req, res) => {
    await albums.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $push: { posts: new ObjectId(req.params.postId) } }
    )
    res.json({ msg: "Post added to album" })
})

app.delete("/api/albums/:id/posts/:postId", async (req, res) => {
    await albums.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $pull: { posts: new ObjectId(req.params.postId) } }
    )
    res.json({ msg: "Post removed from album" })
})

//Activity feeds

// Global feed: everything
app.get("/api/feed/global", async (req, res) => {
    res.json({ posts: await posts.find().toArray(), albums: await albums.find().toArray() })
})

// Local feed: the user and their friends
app.get("/api/feed/local/:userId", async (req, res) => {
    const user = await users.findOne({ _id: new ObjectId(req.params.userId) })
    const ids = [user._id, ...user.friends]
    res.json({
        posts: await posts.find({ owner: { $in: ids } }).toArray(),
        albums: await albums.find({ owner: { $in: ids } }).toArray(),
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
