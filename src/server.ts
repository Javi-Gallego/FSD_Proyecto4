
import 'dotenv/config'
import { app } from './app'
import { AppDataSource } from './database/db'

//variable que se pone usando dontenv y el archivo .env, si no encuentra el valor le pone por defecto 4001
const PORT = process.env.PORT || 4001

const startServer = () => {
    //se intenta conectar  a la BD que devuelve una promesa. Si va OK pone en marcha el servidor
    AppDataSource.initialize()
    .then(() => {
        console.log("Database connected")
        //Activa la app para que este en escucha en el puerto determinado
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

startServer()