
import { appointmentSeedDatabase } from "./seeder_appointments";
import { catalogSeedDatabase } from "./seeder_catalogs";
import { roleSeedDatabase } from "./seeder_roles";
import { serviceSeedDatabase } from "./seeder_services";
import { userSeedDatabase } from "./seeder_users";


const callSeeders = async () => {
    await roleSeedDatabase()
    await userSeedDatabase()
    await serviceSeedDatabase()
    await catalogSeedDatabase()
    await appointmentSeedDatabase()

}

callSeeders()