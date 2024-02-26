
import 'dotenv/config'
import express, { Application, Request, Response } from 'express'


const PORT = process.env.PORT || 4001
console.log(PORT)

const app:Application = express()

app.use(express.json());

app.get("/healthy", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})