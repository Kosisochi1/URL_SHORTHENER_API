import { describe, it, } from "node:test";
import { expect, jest, test ,beforeAll,afterAll,beforeEach} from '@jest/globals';
import { MongoMemoryServer } from "mongodb-memory-server"
import UserModel from "../model/userModel";
import 'jest'
import supertest from 'supertest'
import app from "../api";
import mongoose, { connection } from "mongoose";


export const userPayload = {
    Name: "jane",
    Email: "JaneDoe2@gmail.com",
    Password:"Kosi"
  };
  

describe('Test Users routes', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();

        await mongoose.connect(mongoServer.getUri());
    })
    
    afterAll(async () => {
        await mongoose.disconnect();
    await mongoose.connection.close();
    })
   
    describe.only('should home route', () => {
        test('should return url', async () => {

            await supertest(app).get('/')
           expect(200)
       })
    }
        
        
    )
    describe('Create User', () => {
        test('shouldl return created', async () => {

            
            const response = await supertest(app).post("/user/v1/signup").set('content-type', 'application/json').send({
                Name: "jane",
                Email: "JaneDoe@gmail.com",
                Password:"Kosi"
              })
            expect(response.status).toEqual(201);
            expect(response.body).toMatchObject({
                massage: ' User Created, Check  your Mail and Verify',
                data: expect.any(Object)
            })
            

    
        })
    })
    describe('Verify User Mail', () => {
        let verificationToken;
        const createUser =  UserModel.create(userPayload)
          test('should return verified ', async () => {
           
            verificationToken = (await createUser).verificationToken
            console.log(verificationToken)
    
    
            const response = await supertest(app).post("/user/v1/verify_email").set("content-type", "application/json").send({ Email: "JaneDoe2@gmail.com",verificationToken})
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject({massage:'User Verified'})
    
            
    
    
          })
    })
    
    describe('forgot password route', () => {
        const createUser =  UserModel.create(userPayload)
        test('should return valid email', async() =>{
            const response = await supertest(app).post("/user/v1/forget_password").set("content-type", "application/json").send({ Email: "JaneDoe2@gmail.com" })
            
            expect(response.statusCode).toEqual(200)
        })
    })
    describe.only("Login route", () => {
        const createUser = UserModel.create(userPayload)
        test('should return', async () => {
            const response = await supertest(app).post("/user/v1/login").set("content-type","application/json").send({ Email: "JaneDoe1@gmai2.com",
            Password:"Kosi"})
        })

})


       
        
    

   
 
    
    
})











