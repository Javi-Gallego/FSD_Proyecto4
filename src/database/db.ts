
import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"

import { Role } from '../models/Role'
import { User } from '../models/User'
import { Service } from '../models/Service'
import { Catalog } from '../models/Catalog'
import { Appointment } from '../models/Appointment'
import { Roles1709312378204 } from './migrations/1709312378204-roles'
import { Users1709312392743 } from './migrations/1709312392743-users'
import { Services1709312403623 } from './migrations/1709312403623-services'
import { Catalogs1709312414865 } from './migrations/1709312414865-catalogs'
import { Appointments1709312428019 } from './migrations/1709312428019-appointments'



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "test",
    entities: [Role, User, Service, Catalog, Appointment],
    migrations: [Roles1709312378204, Users1709312392743, Services1709312403623, Catalogs1709312414865, Appointments1709312428019],
    synchronize: false,
    logging: false,
})