
import 'dotenv/config'
import express, { Application } from 'express'
import { deleteUser, getUsers, profile, updateProfile, updateUserRole } from './controllers/userController';
import { login, register } from './controllers/authController';
import { createServices, deleteService, getServices, updateService } from './controllers/serviceController';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';
import { createCatalog, deleteCatalog, getCatalog, updateCatalog } from './controllers/catalogController';
import { createAppointment, getAppointments, updateAppointments } from './controllers/appointmentController';

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
// app.use(Authrouter)
//Users
app.get("/api/users", auth, isSuperAdmin, getUsers) //done
app.get("/api/users/profile", auth, profile) //done
app.put("/api/users/profile", auth, updateProfile) //done
app.delete("/api/users", auth, isSuperAdmin, deleteUser) //done
app.put("/api/users/:id/role", auth, isSuperAdmin, updateUserRole) //done

//Services
app.get("/api/services", getServices) // done
app.post("/api/services", auth, isSuperAdmin, createServices) // done
app.put("/api/services/:id", auth, isSuperAdmin, updateService) // done
app.delete("/api/services", auth, isSuperAdmin, deleteService) // done

//Catalog
app.get("/api/catalog", getCatalog) // done
app.post("/api/catalog", auth, isSuperAdmin, createCatalog) //done
app.put("/api/catalog/:id", auth, isSuperAdmin, updateCatalog) //done
app.delete("/api/catalog/:id", auth, isSuperAdmin, deleteCatalog) //done

//Appointments
app.post("/api/appointments", auth, createAppointment) //done
app.put("/api/appointments/:id", auth, updateAppointments) //done
app.get("/api/appointments", auth, getAppointments) //done
app.get("/api/appointments/:id", auth, getAppointments) //done

//get y delete: id no por body
//put y post: id por body o por params