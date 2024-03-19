import { describe } from "node:test";
import { expect, jest, test ,beforeAll,afterAll,beforeEach,it} from '@jest/globals';
import { MongoMemoryServer } from "mongodb-memory-server"
import UserModel from "../model/userModel";
import 'jest'
import supertest from 'supertest'
import app from "../api";
import useController from '../users/userServices'
import mongoose from "mongoose";
import { response } from "express";
import userController from "../users/userController";

export const userPayload = {
    Name: "jane",
    Email: "JaneDoe2@gmail.com",
    Password:"Kosi"
  };

describe("URL Route", () => {
    let verificationToken: any;

    let token: any
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    beforeAll(async () => {
        const createUser = useController.createUser(userPayload
        )
        const validateMail = useController.verifyMail(userPayload.Email)
        verificationToken = (await createUser).data?.token
        
       
        const jwtT = await useController.login(userPayload.Email,userPayload.Password)
        // const response = await supertest(app).post("/user/v1/login").set("content-type", "application/json").send({
        //     Email: "JaneDoe2@gmail.com",
        //     Password: "Kosi"
        // })


        token = jwtT.data?.token;
    
     })
        

        

           

        afterAll(async () => {
            await mongoose.disconnect()
            await mongoose.connection.close()
        })




        test("Create Short Url", async () => {
        

            const response = await supertest(app).post("/url/v1/short_url").set("authorization", `Bearer ${token}`).set("content-type", "application/json").send({ Long_url: "www.unn.edu.ng", Custtom_url: "" })


            expect(response.statusCode).toEqual(201)
        



        },100000)



})