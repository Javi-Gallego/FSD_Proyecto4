import request from "supertest";
import { AppDataSource } from "../database/db";
import { app } from '../app'

let server: any;
let token = "";
let id: number;

beforeAll(async () => {
    await AppDataSource.initialize()

    server = app.listen(4001);
})

afterAll(async () => {
    try {
        if (server) {
            await server.close();
            console.log('Server closed');
        }

        await AppDataSource.destroy();
    } catch (error) {
        console.error('Error closing server and destroying database connection:', error);
        throw error;
    }
})

describe('server tests', () => {
    test('GET healthy', async () => {
        const { status, body } = await request(server)
            .get('/healthy')

        expect(status).toBe(200)
        expect(body.success).toBe(true)
        expect(body.message).toEqual("Server is healthy")
    })
})

describe('auth tests', () => {
    test('Register user', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/register')
            .send({
                first_name: "Alberto",
                last_name: "Martínez",
                email: "alberto@gmail.com",
                password: "123456"
            })

        expect(status).toBe(201)

        id = body.data.id
    })

    test('Register user wihtout password', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/register')
            .send({
                email: "ricardo@gmail.com",
                password: ""
            })
        expect(status).toBe(500)
    })

    test('Login user', async () => {
        const { status, body } = await request(server)
            .post('/api/auth/login')
            .send({
                email: "super_admin@gmail.com",
                password: "123456"
            })
        token = body.token

        expect(status).toBe(200)
    })
})

test('delete user', async () => {
    const { status, body } = await request(server)
        .delete("/api/users")
        .set('Authorization', `Bearer ${token}`)
        .send({ id: id })

    expect(status).toBe(200)
})