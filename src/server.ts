
import 'dotenv/config'
import express, { Application } from 'express'


const PORT = process.env.PORT || 4001
console.log(PORT)

const app:Application = express()

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})