
import 'dotenv/config'
import express, { Application } from 'express'
import { deleteUser, getUsers, profile, updateProfile, updateUserRole } from './controllers/userController';
import { login, register } from './controllers/authController';
import { createServices, deleteService, getServices, updateService } from './controllers/serviceController';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';
import { createCatalog, getCatalog, updateCatalog } from './controllers/catalogController';
import { createAppointment } from './controllers/appointmentController';



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
app.post("/api/auth/register", register) //done
app.post("/api/auth/login", login) //done

//Users
app.get("/api/users", auth, isSuperAdmin, getUsers) //done
app.get("/api/users/profile", auth, profile) //done
app.put("/api/users/profile", auth, updateProfile) //done
app.delete("/api/users", auth, isSuperAdmin, deleteUser) //done
app.put("/api/users/:id/role", auth, isSuperAdmin, updateUserRole) //done

//Services
app.get("/api/services", getServices) // done
app.post("/api/services", auth, isSuperAdmin, createServices) // done
app.put("/api/services", auth, isSuperAdmin, updateService) // done
app.delete("/api/services", auth, isSuperAdmin, deleteService) // done

//Catalog
app.get("/api/catalog", getCatalog) // done
app.post("/api/catalog", auth, isSuperAdmin, createCatalog) //done
app.put("/api/catalog", updateCatalog)

//Appointments
app.post("/api/appointments", createAppointment)
app.put("/api/appointments",)
app.get("/api/appointments",)
app.get("/api/appointments/:id",)