
import 'dotenv/config'
import express, { Application } from 'express'
import { createReg } from './controllers/registerController';
import { createLogin } from './controllers/loginController';
import { deleteUser, getUser, updateUser } from './controllers/userController';



export const app:Application = express()

app.use(express.json());

app.get("/healthy", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    })
})

//Endpoints

//Authentications
app.post("/api/auth/register", createReg)
app.post("/api/auth/login", createLogin)

//Users
app.get("/api/users", getUser)
app.get("/api/users/profile", getUser)
app.put("/api/users/profile", updateUser)
app.delete("/api/users/:id", deleteUser)
app.put("/api/users/:id/role", updateUser)

//Appointments
app.post("/api/appointments",)
app.put("/api/appointments",)
app.get("/api/appointments/:id",)
app.get("/api/appointments",)

//Services
app.get("/api/services",)
app.post("/api/services",)
app.put("/api/services/:id",)
app.delete("/api/services/:id",)