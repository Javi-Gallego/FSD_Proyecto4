import { Appointment } from "../../models/Appointment";
import { Catalog } from "../../models/Catalog";
import { Role } from "../../models/Role";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import { AppDataSource } from "../db";

const roleSeedDatabase = async() => {
    try {
        await AppDataSource.initialize()
        
        const roleSuperAdmin = new Role()
        roleSuperAdmin.name = "super_admin"
        await roleSuperAdmin.save()
        
        const roleAdmin = new Role()
        roleAdmin.name = "admin"
        await roleAdmin.save()
        
        const roleUser = new Role()
        roleUser.name = "user"
        await roleUser.save()

        const roleTatooArtist = new Role()
        roleTatooArtist.name = "tatoo_artist"
        await roleTatooArtist.save()

        console.log("--------------------------------------------------")
        console.log("----- Los roles se han creado correctamente ------")
        console.log("--------------------------------------------------")

    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}

const userSeedDatabase = async() => {
    try {
        await AppDataSource.initialize()
        
        const User1 = new User()
        User1.firstName = "Super_Admin"
        User1.lastName = "Super"
        User1.email = "super_admin@gmail.com"
        User1.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        User1.roleId = 1
        await User1.save()
        
        const User2 = new User()
        User2.firstName = "Admin"
        User2.lastName = "Admin"
        User2.email = "admin@gmail.com"
        User2.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        User1.roleId = 2
        await User2.save()
        
        const User3 = new User()
        User3.firstName = "User"
        User3.lastName = "User"
        User3.email = "user@gmail.com"
        User3.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User3.save()

        const User4 = new User()
        User4.firstName = "Javier"
        User4.lastName = "Gallego"
        User4.email = "javi@gmail.com"
        User4.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User4.save()

        const User5 = new User()
        User5.firstName = "Silvia"
        User5.lastName = "Perelló"
        User5.email = "silvia@gmail.com"
        User5.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User5.save()

        const User6 = new User()
        User6.firstName = "Fernando"
        User6.lastName = "Elegido"
        User6.email = "fer@gmail.com"
        User6.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User6.save()

        const User7 = new User()
        User7.firstName = "Víctor"
        User7.lastName = "Blasco"
        User7.email = "victor@gmail.com"
        User7.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User7.save()

        const User8 = new User()
        User8.firstName = "Sergio"
        User8.lastName = "Torres"
        User8.email = "sergio@gmail.com"
        User8.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User8.save()

        const User9 = new User()
        User9.firstName = "Dani"
        User9.lastName = "Marí"
        User9.email = "dani@gmail.com"
        User9.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User9.save()

        const User10 = new User()
        User10.firstName = "Carlos"
        User10.lastName = "Ibáñez"
        User10.email = "carlos@gmail.com"
        User10.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        await User10.save()

        const User11 = new User()
        User11.firstName = "Pedro"
        User11.lastName = "García"
        User11.email = "pedro@gmail.com"
        User11.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        User1.roleId = 4
        await User11.save()

        const User12 = new User()
        User12.firstName = "José Luis"
        User12.lastName = "Ferrer"
        User12.email = "jose@gmail.com"
        User12.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        User1.roleId = 4
        await User12.save()

        console.log("--------------------------------------------------")
        console.log("----- Los users se han creado correctamente ------")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}

const serviceSeedDatabase = async() => {
    try {
        await AppDataSource.initialize()
        
        const Service1 = new Service()
        Service1.serviceName = "Tatuajes personalizados"
        Service1.description = "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
        await Service1.save()
        
        const Service2 = new Service()
        Service2.serviceName = "Tatuajes de catálogo"
        Service2.description = "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas."
        await Service2.save()
        
        const Service3 = new Service()
        Service3.serviceName = "Restauración y rejuvenecimiento de trabajos"
        Service3.description = "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad."
        await Service3.save()

        const Service4 = new Service()
        Service4.serviceName = "Colocación de piercings y dilatadores"
        Service4.description = "Ofrecemos servicios preofesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
        await Service4.save()

        const Service5 = new Service()
        Service5.serviceName = "Venta de piercings y otros artículos"
        Service5.description = "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único."
        await Service5.save()

        console.log("--------------------------------------------------")
        console.log("---- Los services se han creado correctamente ----")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}

const catalogSeedDatabase = async () => {
    try {
        await AppDataSource.initialize()
        
        const Catalog1 = new Catalog()
        Catalog1.tattooName = "Flames"
        Catalog1.urlImage = "./img/flames.jpg"
        await Catalog1.save()

        const Catalog2 = new Catalog()
        Catalog2.tattooName = "Lion"
        Catalog2.urlImage = "./img/lion.jpg"
        await Catalog2.save()

        const Catalog3 = new Catalog()
        Catalog3.tattooName = "Tiger"
        Catalog3.urlImage = "./img/tiger.jpg"
        await Catalog3.save()

        const Catalog4 = new Catalog()
        Catalog4.tattooName = "Sea"
        Catalog4.urlImage = "./img/sea.jpg"
        await Catalog4.save()

        const Catalog5 = new Catalog()
        Catalog5.tattooName = "Beach"
        Catalog5.urlImage = "./img/beach.jpg"
        await Catalog5.save()

        const Catalog6 = new Catalog()
        Catalog6.tattooName = "Dragon"
        Catalog6.urlImage = "./img/dragon.jpg"
        await Catalog6.save()

        const Catalog7 = new Catalog()
        Catalog7.tattooName = "Balloons"
        Catalog7.urlImage = "./img/balloons.jpg"
        await Catalog7.save()

        const Catalog8 = new Catalog()
        Catalog8.tattooName = "Fairy"
        Catalog8.urlImage = "./img/fairy.jpg"
        await Catalog8.save()

        const Catalog9 = new Catalog()
        Catalog9.tattooName = "Heart"
        Catalog9.urlImage = "./img/heart.jpg"
        await Catalog9.save()

        const Catalog10 = new Catalog()
        Catalog10.tattooName = "Tribal"
        Catalog10.urlImage = "./img/tribal.jpg"
        await Catalog10.save()

        console.log("--------------------------------------------------")
        console.log("---- Los tattoos se han creado correctamente -----")
        console.log("--------------------------------------------------")
    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}

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

//roleSeedDatabase()
//userSeedDatabase()
//serviceSeedDatabase()
//catalogSeedDatabase()
//appointmentSeedDatabase()