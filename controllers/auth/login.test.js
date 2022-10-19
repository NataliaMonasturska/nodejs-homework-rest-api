/* eslint-disable no-undef */

const express = require('express');
const request = require('supertest');
const login = require('./login');
const { MongoClient } = require('mongodb');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");
const { PORT, DB_TEST_HOST } = process.env;
//  const app = express();
app.post("/api/auth/login")

jest.setTimeout(110000);


describe("test auth routes", () => {
  let CONNECT;
 
  let server;

  beforeAll(() => { server = app.listen(PORT) });

  afterAll(() => { server.close() })

  beforeEach(async() => {
    CONNECT = await mongoose.connect(DB_TEST_HOST);
    // console.log("CONNECT", CONNECT);
  
    //  .then((res)=>{

    //     CONNECT = res;
    //     done();
    //    } )
  })

  afterEach(async() => {
    //  mongoose.connect(DB_TEST_HOST)
    // await mongoose.connection.collection('users').drop()
    // await mongoose.connect(DB_TEST_HOST)
    // await mongoose.connection.collection('users').drop()
    // mongoose.connection.db.dropCollection('users', async () => {
    //  mongoose.connect(DB_TEST_HOST)
    // console.log("CONNECT IN AFTEReACH", CONNECT);
    CONNECT.disconnect()
    })
   
    // CONNECT.disconnect();
    // done()
  // })

  test("The login route", async () => {
    const hashPassword = await bcrypt.hash('123456', 10);
    const newUser = {
      email: 'test@meta.ua',
      password: hashPassword,
      avatarURL: 'test_avatar_url'
    }
    const user = await User.create(newUser);

    const loginUser = {
      email: 'test@meta.ua',
      password: '123456'
    }


    const response = await request(app).post('/api/auth/login').send(loginUser)

    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.data.token).toBeTruthy();
    const { token, email, subscription } = await User.findById(user._id);
    expect(body.data.token).toBe(token);
    expect(body.data.user).toEqual({ email, subscription })

  }
  )
}
)


    // const users = db.collection('users');
    // const mockUser = { _id: 'some-user-id', name: 'John' };
    // await users.insertOne(mockUser);

    // const mReq = {
    //   body: {
    //     email: "natali@ meta.ua",
    //     password: "111111",
    //   }
    // }
    // const mRes = {}

    // // const user = {
    // //   email: 'natali@ meta.ua',
    // //   subscription: 'pro',
    // // }
    // await login(mReq, mRes);

    // expect(mRes.json).toHaveBeenCalledWith(
    //   expect.objectContaining({
    //     status: "success",
    //     code: 200,
    //     data: {
    //       token: expect.any(String),
    //       user: {
    //         email: user.email,
    //         subscription: user.subscription
    //       }
    //     }
    //   })
    // )




    // ({
    //     "status": "success",
    //     "code": 200,
    //     "data": {
    //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2IwZDhiNjgxMDFhNGMyNGVlZGY0ZCIsImlhdCI6MTY2NTY1NzQyNywiZXhwIjoxNjY1NjY4MjI3fQ.wOWyGPIAUhvg5pzEcvmkPmwKjkP4xRby-ed19JWjwrg",
    //         "user": {
    //              "email": "natali@ meta.ua",
    //           "subscription": `${user.subscription}`
    //          }

    //        }})


    //  expect(200);
    //  expect(mRes).toEqual({
    //   "status": "success",
    //   "code": 200,
    //   "data": {
    //       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2IwZDhiNjgxMDFhNGMyNGVlZGY0ZCIsImlhdCI6MTY2NTY1NzQyNywiZXhwIjoxNjY1NjY4MjI3fQ.wOWyGPIAUhvg5pzEcvmkPmwKjkP4xRby-ed19JWjwrg",
    //       "user": {
    //           "email": "natali@ meta.ua",
    //           "subscription": `${user.subscription}`
    //       }

    //     }})


    //    await expect(login())
    //    .post('/api/auth/login')
    // //  const response = await request.agent(app).post("/api/auth/register")
    //  .send({
    //     "password": "555555",
    //     "email": "natalia@meta.ua"
    //   })
//     //  .expect(200);
//   })
// })



// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String