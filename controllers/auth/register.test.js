const express = require('express');
const request = require('supertest');
const register = require('./register');
const {describe, beforeAll, afterAll, test,  expect, } = require('jest');
const app = express();
app.get("api/auth/register", register)

describe("test register controller", ()=> {
    beforeAll(()=> app.listen(3000));
    afterAll(()=> app.close());
     test("The response of the register controller must have a status code of 200", async()=> {
     const response = await request(app).get("/api/auth/register");
     expect(response.status).toBe(200);

     })
})



// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String