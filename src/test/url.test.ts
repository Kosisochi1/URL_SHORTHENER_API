import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createUrl from '../urls/urlServices'
import { after, before, describe, it } from 'node:test'
import app from '../api'



describe('url', () => {
    before(async () => {
        const MongoServer = await MongoMemoryServer.create()
        await mongoose.connect(MongoServer.getUri())
    })
    after(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('user not logged in', () => {
        it('should return 401', async() => {
            const { statusCode } = await supertest(app).post('/url/v1/short_url')
            expect(statusCode)
        })
    })
})

function expect(statusCode: number) {
    throw new Error('Function not implemented.')
}
