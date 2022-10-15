const axios = require('axios')
const {faker} = require('@faker-js/faker')
const {server} = require('../../src/network')

const URL = `http://localhost:${process.env.PORT || 3000}`

beforeAll(async () => {
    await server.start()
})

afterAll(async () => {
    await server.stop()
})

describe('API: GET /', () => {
    let response = {}

    test('Should return 200 as status code', async () => {
        response = await axios.get(URL)
        expect(response.status).toBe(200)
    })

    test('Should be a successful operation', () => {
        expect(response.data.error).toBe(false)
    })
})

describe('E2E test: Use cases from UserService', () => {

    // User Mode Client
    const name = faker.name.firstName()
    const lastName = faker.name.lastName()
    const userName = faker.internet.userName()
    const balance = faker.random.numeric()
    const newUser = {
        name,
        lastName,
        userName,
        balance,
        email: faker.internet.email(name, lastName).toLowerCase(),
        password: faker.datatype.string()
    }
    const tokens = {
        accessToken: '',
        refreshToken: ''
    }


    // User Mode Vendor
    const name2 = faker.name.firstName()
    const lastName2 = faker.name.lastName()
    const newUser2 = {
        name: name2,
        lastName: lastName2,
        userName: faker.internet.userName(),
        balance: 300000,
        email: faker.internet.email(name2, lastName2).toLowerCase(),
        password: faker.datatype.string(),
        role: '1'
    }
    const tokens2 = {
        accessToken: '',
        refreshToken: ''
    }

    describe('Testing save user as client', () => {
        let response = {}

        test('Should return 201 as status code', async () => {
            response = await axios.post(`${URL}/api/user/signup`, newUser)
            expect(response.status).toBe(201)
        })
    })

    describe('Testing login a user as client', () => {
        const keys = ['accessToken', 'refreshToken']

        test('Should return accessToken and refreshToken', async () => {
            const {
                data: {message}
            } = await axios.post(`${URL}/api/user/login`, {
                email: newUser.email,
                password: newUser.password
            })

            expect(Object.keys(message)).toEqual(keys)
            tokens.accessToken = message.accessToken
            tokens.refreshToken = message.refreshToken
        })
    })


    describe('Testing save user as vendor', () => {
        let response = {}

        test('Should return 201 as status code', async () => {
            response = await axios.post(`${URL}/api/user/signup`, newUser2)
            expect(response.status).toBe(201)
        })
    })

    describe('Testing login a user as vendor', () => {
        const keys = ['accessToken', 'refreshToken']

        test('Should return accessToken and refreshToken', async () => {
            const {
                data: {message}
            } = await axios.post(`${URL}/api/user/login`, {
                email: newUser2.email,
                password: newUser2.password
            })

            expect(Object.keys(message)).toEqual(keys)
            tokens2.accessToken = message.accessToken
            tokens2.refreshToken = message.refreshToken
        })
    })

})

/**
 * E commerce
 * ------
 * 2. Recargar saldo del cliente
 * 4. Registrar un artículo (precio) del vendedor
 * 5. El cliente intenta comprar el artículo
 *  5.1. El saldo del cliente del insuficiente -> Recarga más saldo
 *  5.2. El saldo es suficiente -> Se genera la compra
 * 6. El saldo pasa de la cuenta del cliente a la cuenta del vendedor
 * 7. El artículo pasa de la cuenta del vendedor a la cuenta del cliente
 *
 * Nota: las únicas rutas públicas son las rutas de registro
 */
