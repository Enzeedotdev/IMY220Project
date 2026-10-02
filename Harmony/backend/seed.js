import { db } from "./db.js"


export async function seedDatabase() {
    if ((await db.collection("users").countDocuments()) > 0) return

    const now = new Date()

    const users = await db.collection("users").insertMany([
        {
            username: "alice",
            email: "alice@example.com",
            password: "password123",
            bio: "Landscape photographer.",
            avatar: "",
            friends: [],
            requests: [],
        },
        {
            username: "bob",
            email: "bob@example.com",
            password: "password123",
            bio: "Street photography enthusiast.",
            avatar: "",
            friends: [],
            requests: [],
        },
    ])
    const alice = users.insertedIds[0]
    const bob = users.insertedIds[1]

    await db.collection("users").updateOne({ _id: alice }, { $set: { friends: [bob] } })
    await db.collection("users").updateOne({ _id: bob }, { $set: { friends: [alice] } })

    const posts = await db.collection("posts").insertMany([
        { owner: alice, username: "alice", image: "", description: "Sunrise over the mountains.", hashtags: ["sunrise", "mountains"], createdAt: now },
        { owner: bob, username: "bob", image: "", description: "Rainy night in the city.", hashtags: ["city", "night"], createdAt: now },
    ])

    await db.collection("albums").insertOne({
        owner: alice,
        username: "alice",
        name: "Favourites",
        description: "My favourite shots.",
        hashtags: ["favourites"],
        posts: [posts.insertedIds[0]],
        createdAt: now,
    })

    await db.collection("comments").insertOne({
        post: posts.insertedIds[0],
        owner: bob,
        username: "bob",
        text: "Beautiful shot!",
        createdAt: now,
    })

    await db.collection("reportReasons").insertMany([
        { reason: "Spam" },
        { reason: "Inappropriate content" },
        { reason: "Harassment" },
    ])
}
