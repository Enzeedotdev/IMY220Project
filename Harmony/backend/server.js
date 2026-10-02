import express from "express"
import { MongoClient } from "mongodb"

const app = express()
const PORT = 3001

app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
await client.connect()
const db = client.db("harmony")

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
    await db.collection("users").insertOne(user)
    res.json({ user })
})

app.post("/api/signin", async (req, res) => {
    const user = await db.collection("users").findOne({
        email: req.body.email,
        password: req.body.password,
    })
    res.json({ user })
})

app.post("/api/logout", (req, res) => {
    res.json({ msg: "Logged out" })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
