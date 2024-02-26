
import 'dotenv/config'
import { app } from './app'
import { AppDataSource } from './database/db'

const PORT = process.env.PORT || 4001

AppDataSource.initialize()
.then(() => {
    console.log("Database connected");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})