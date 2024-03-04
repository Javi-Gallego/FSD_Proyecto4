import { Role } from "../../models/Role"
import { AppDataSource } from "../db"

export const roleSeedDatabase = async() => {
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
        roleTatooArtist.name = "tattoo_artist"
        await roleTatooArtist.save()

        const worker = new Role()
        worker.name = "worker"
        await worker.save()

        console.log("--------------------------------------------------")
        console.log("----- Los roles se han creado correctamente ------")
        console.log("--------------------------------------------------")

    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}