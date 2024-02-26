
import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Role1708984735981 } from './migrations/1708984735981-role'
import { Users1708985068309 } from './migrations/1708985068309-users'
import { Services1708985956637 } from './migrations/1708985956637-services'
import { TattooArtists1708986294476 } from './migrations/1708986294476-tattoo_artists'
import { Appointments1708990376954 } from './migrations/1708990376954-appointments'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "test",
    entities: [],
    migrations: [Role1708984735981, Users1708985068309, Services1708985956637, TattooArtists1708986294476, Appointments1708990376954],
    synchronize: false,
    logging: false,
})