import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URI)

export let db

export async function connectDB() {
    await client.connect()
    db = client.db("harmony")
}
