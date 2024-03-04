import { User } from "../../models/User"
import { AppDataSource } from "../db"

export const userSeedDatabase = async() => {
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
        User2.roleId = 2
        await User2.save()
        
        const User3 = new User()
        User3.firstName = "Worker"
        User3.lastName = "Undefined"
        User3.email = "worker@gmail.com"
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
        User11.roleId = 4
        await User11.save()

        const User12 = new User()
        User12.firstName = "José Luis"
        User12.lastName = "Ferrer"
        User12.email = "jose@gmail.com"
        User12.passwordHash = "$2b$08$k2z5SGN9d2CiC.Irg17mseC9TS4hDGgDJHjW8mVISfq42v9A47FIe"
        User12.roleId = 4
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