import { Appointment } from "../../models/Appointment"
import { AppDataSource } from "../db"

const appointmentSeedDatabase = async () => {
    try {
        await AppDataSource.initialize()
        
        const Appointment1 = new Appointment()
        Appointment1.userId = 4
        Appointment1.serviceId = 2
        Appointment1.artistId = 12
        Appointment1.date = new Date("2024-03-10 10:00:00")
        Appointment1.catalogId = 10
        await Appointment1.save()

        console.log("--------------------------------------------------")
        console.log("-- Los appointments se han creado correctamente --")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}

appointmentSeedDatabase()