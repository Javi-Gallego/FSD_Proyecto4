
import 'dotenv/config'
import express, { Application, Request, Response } from 'express'

export const app:Application = express()

app.use(express.json());

app.get("/healthy", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    })
})