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

        const Appointment2 = new Appointment()
        Appointment2.userId = 5
        Appointment2.serviceId = 2
        Appointment2.artistId = 12
        Appointment2.date = new Date("2024-03-10 12:00:00")
        Appointment2.catalogId = 10
        await Appointment2.save()

        const Appointment3 = new Appointment()
        Appointment3.userId = 6
        Appointment3.serviceId = 2
        Appointment3.artistId = 12
        Appointment3.date = new Date("2024-03-10 14:00:00")
        Appointment3.catalogId = 8
        await Appointment3.save()

        const Appointment4 = new Appointment()
        Appointment4.userId = 7
        Appointment4.serviceId = 2
        Appointment4.artistId = 12
        Appointment4.date = new Date("2024-03-10 16:00:00")
        Appointment4.catalogId = 7
        await Appointment4.save()

        const Appointment5 = new Appointment()
        Appointment5.userId = 8
        Appointment5.serviceId = 2 
        Appointment5.artistId = 12
        Appointment5.date = new Date("2024-03-10 18:00:00")
        Appointment5.catalogId = 6
        await Appointment5.save()

        const Appointment6 = new Appointment()
        Appointment6.userId = 9
        Appointment6.serviceId = 1
        Appointment6.artistId = 11
        Appointment6.date = new Date("2024-03-10 10:00:00")
        await Appointment6.save()

        const Appointment7 = new Appointment()
        Appointment7.userId = 4
        Appointment7.serviceId = 3
        Appointment7.artistId = 11
        Appointment7.date = new Date("2024-03-11 12:00:00")
        await Appointment7.save()

        const Appointment8 = new Appointment()
        Appointment8.userId = 8
        Appointment8.serviceId = 4
        Appointment8.date = new Date("2024-03-12 14:00:00")
        await Appointment8.save()

        const Appointment9 = new Appointment()
        Appointment9.userId = 8
        Appointment9.serviceId = 1
        Appointment9.artistId = 11
        Appointment9.date = new Date("2024-03-13 10:00:00")
        await Appointment9.save()

        const Appointment10 = new Appointment()
        Appointment10.userId = 5
        Appointment10.serviceId = 3
        Appointment10.artistId = 12
        Appointment10.date = new Date("2024-03-13 10:00:00")
        await Appointment10.save()

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