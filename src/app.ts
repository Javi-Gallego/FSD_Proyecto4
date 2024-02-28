
import 'dotenv/config'
import express, { Application } from 'express'
import { deleteUserById, getUserByEmail, getUsers, profile, updateUserById, updateUserRole } from './controllers/userController';
import { login, register } from './controllers/authController';
import { createServices, deleteService, getServices, updateService } from './controllers/serviceController';



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
app.post("/api/auth/register", register)
app.post("/api/auth/login", login)

//Users
app.get("/api/users", getUsers)
app.get("/api/users/profile", profile)
app.get("/api/users/:email", getUserByEmail)
app.put("/api/users/profile", updateUserById)
app.delete("/api/users/:id", deleteUserById)
app.put("/api/users/:id/role", updateUserRole)

//Appointments
app.post("/api/appointments",)
app.put("/api/appointments",)
app.get("/api/appointments/:id",)
app.get("/api/appointments",)

//Services
app.get("/api/services", getServices)
app.post("/api/services", createServices)
app.put("/api/services/:id", updateService)
app.delete("/api/services/:id", deleteService)