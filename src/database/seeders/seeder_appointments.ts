import { Appointment } from "../../models/Appointment"
import { AppDataSource } from "../db"

export const appointmentSeedDatabase = async () => {
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

        const Appointment11 = new Appointment()
        Appointment11.userId = 4
        Appointment11.serviceId = 2
        Appointment11.artistId = 12
        Appointment11.date = new Date("2024-03-07 10:00:00")
        Appointment11.catalogId = 10
        await Appointment11.save()

        const Appointment12 = new Appointment()
        Appointment12.userId = 5
        Appointment12.serviceId = 2
        Appointment12.artistId = 12
        Appointment12.date = new Date("2024-03-07 12:00:00")
        Appointment12.catalogId = 4
        await Appointment12.save()

        const Appointment13 = new Appointment()
        Appointment13.userId = 6
        Appointment13.serviceId = 2
        Appointment13.artistId = 12
        Appointment13.date = new Date("2024-03-07 14:00:00")
        Appointment13.catalogId = 3
        await Appointment13.save()

        const Appointment14 = new Appointment()
        Appointment14.userId = 7
        Appointment14.serviceId = 2
        Appointment14.artistId = 12
        Appointment14.date = new Date("2024-03-07 16:00:00")
        Appointment14.catalogId = 2
        await Appointment14.save()

        const Appointment15 = new Appointment()
        Appointment15.userId = 8
        Appointment15.serviceId = 2 
        Appointment15.artistId = 12
        Appointment15.date = new Date("2024-03-07 18:00:00")
        Appointment15.catalogId = 1
        await Appointment15.save()

        const Appointment16 = new Appointment()
        Appointment16.userId = 9
        Appointment16.serviceId = 1
        Appointment16.artistId = 11
        Appointment16.date = new Date("2024-03-08 10:00:00")
        await Appointment16.save()

        const Appointment17 = new Appointment()
        Appointment17.userId = 4
        Appointment17.serviceId = 3
        Appointment17.artistId = 11
        Appointment17.date = new Date("2024-03-08 12:00:00")
        await Appointment17.save()

        const Appointment18 = new Appointment()
        Appointment18.userId = 8
        Appointment18.serviceId = 4
        Appointment18.date = new Date("2024-03-08 14:00:00")
        await Appointment18.save()

        const Appointment19 = new Appointment()
        Appointment19.userId = 8
        Appointment19.serviceId = 1
        Appointment19.artistId = 11
        Appointment19.date = new Date("2024-03-08 10:00:00")
        await Appointment19.save()

        const Appointment20 = new Appointment()
        Appointment20.userId = 5
        Appointment20.serviceId = 3
        Appointment20.artistId = 12
        Appointment20.date = new Date("2024-03-09 10:00:00")
        await Appointment20.save()

        const Appointment21 = new Appointment()
        Appointment21.userId = 5
        Appointment21.serviceId = 3
        Appointment21.artistId = 11
        Appointment21.date = new Date("2024-03-01 10:00:00")
        await Appointment21.save()

        const Appointment22 = new Appointment()
        Appointment22.userId = 6
        Appointment22.serviceId = 3
        Appointment22.artistId = 12
        Appointment22.date = new Date("2024-03-01 10:00:00")
        await Appointment22.save()

        const Appointment23 = new Appointment()
        Appointment23.userId = 7
        Appointment23.serviceId = 3
        Appointment23.artistId = 11
        Appointment23.date = new Date("2024-03-01 12:00:00")
        await Appointment23.save()

        const Appointment24 = new Appointment()
        Appointment24.userId = 8
        Appointment24.serviceId = 3
        Appointment24.artistId = 12
        Appointment24.date = new Date("2024-03-01 12:00:00")
        await Appointment24.save()

        console.log("--------------------------------------------------")
        console.log("-- Los appointments se han creado correctamente --")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}