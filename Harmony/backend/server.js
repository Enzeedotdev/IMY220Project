import express from "express"
import { connectDB } from "./db.js"
import { seedDatabase } from "./seed.js"

const app = express()
const PORT = 3001

app.use(express.json())

await connectDB()
await seedDatabase()

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
