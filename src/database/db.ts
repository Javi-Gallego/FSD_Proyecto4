
import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Role1708984735981 } from './migrations/1708984735981-role'
import { Users1708985068309 } from './migrations/1708985068309-users'
import { Services1708985956637 } from './migrations/1708985956637-services'
import { Appointments1708990376954 } from './migrations/1708990376954-appointments'
import { Role } from '../models/Role'
import { User } from '../models/User'
import { Appointment } from '../models/Appointment'
import { Service } from '../models/Service'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "test",
    entities: [Role, User, Service, Appointment],
    migrations: [Role1708984735981, Users1708985068309, Services1708985956637, Appointments1708990376954],
    synchronize: false,
    logging: false,
})