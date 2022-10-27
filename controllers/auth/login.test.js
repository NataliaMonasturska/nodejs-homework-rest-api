/* eslint-disable no-undef */
const request = require('supertest');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose"); 
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");
const { PORT, DB_TEST_HOST } = process.env;
app.post("/api/auth/login")

jest.setTimeout(110000);



describe("test auth routes", () => {
  let CONNECT;
  let server;

  beforeAll(() => { server = app.listen(PORT) });

  afterAll(() => { server.close() })

  beforeEach(async () => {
    CONNECT = await mongoose.connect(DB_TEST_HOST);
  })

  afterEach(async () => {
    await mongoose.connection.collection('users').drop()
    CONNECT.disconnect()
  })


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
