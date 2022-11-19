const { expect } = require('chai');
const crypto = require('crypto');
const request = require('supertest');
const app = require('../../src/app.js');
const { User, conn } = require('../../src/db.js');

let hashedpass1 = crypto.createHash('md5').update("123456").digest('hex');
let hashedpass2 = crypto.createHash('md5').update("56789").digest('hex');

const user1 = {
  mail: "john@travolta.com",
  pass: hashedpass1
};

const user2 = {
  mail: "donald@trump.com",
  pass: hashedpass2
};

const user3 = {
  mail: "rick@astley.com",
  pass: "rickrolled"
};

const user4 = {
  mail: "elon@musk.com",
  pass: "SpaceX"
};

describe('User routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  before(() => User.sync({ force: true })
    .then(() => User.create(user1))
    .then(() => User.create(user2)));
  
  describe("GET user", () => {
    it("should get 200 when getting all users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).to.eql(200);
    });
    it("should return 2 users", async () => {
      const res = await request(app).get("/users");
      expect(res.body.length).to.eql(2);
    });
    it("the response should be an array", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).to.eql(200);
    });
  })
  describe("GET user by mail and password", () => {
    it("should get 200 when requesting a specific user", async () => {
      const res = await request(app).get("/users").send({
                                                          mail: "john@travolta.com",
                                                          pass: "123456"
                                                        });
      expect(res.statusCode).to.eql(200);
    });
    it("should get 404 when mail and password don't combine", async () => {
      const res = await request(app).get("/users").send(user3);
      expect(res.statusCode).to.eql(404);
    });
    it("should get 'Invalid user credentials' msg", async () => {
      const res = await request(app).get("/users").send(user4);
      expect(res.body).to.eql({msg: 'Invalid user credentials'});
    });
  });
  describe("CREATE user", () => {
    it("should get 200 when creating a user", async () => {
      const res = await request(app).post("/users").send(user3);
      expect(res.statusCode).to.eql(200);
    });
    it("should get 'User created' msg", async () => {
      const res = await request(app).post("/users").send(user4);
      expect(res.body).to.eql({msg: 'User created'});
    });
    it("should get 404 when creating a user with missing mail", async () => {
      const res = await request(app).post("/users").send({mail: "test@test.com"});
      expect(res.statusCode).to.eql(404);
    });
    it("should get 'Missing information' msg", async () => {
      const res = await request(app).post("/users").send({mail: "test@test.com"});
      expect(res.statusCode).to.eql(404);
    });
    it("should get 404 when creating a user with missing password", async () => {
      const res = await request(app).post("/users").send({pass: "anydata"});
      expect(res.statusCode).to.eql(404);
    });
    it("should get 'Missing information' msg", async () => {
      const res = await request(app).post("/users").send({pass: "anydata"});
      expect(res.statusCode).to.eql(404);
    });
  });
  describe("UPDATE user", () => {
    it("should get 200 when updating a user", async () => {
      const res = await request(app).put("/users").send({
                                                          mail: "rick@astley.com",
                                                          pass: "newpassword"
                                                        });
      expect(res.statusCode).to.eql(200);
    });
    it("should get 'User created' msg", async () => {
      const res = await request(app).put("/users").send(user4);
      expect(res.body).to.eql({msg: 'User updated'});
    });
    it("should get 404 when updating a user with wrong credentials", async () => {
      const res = await request(app).put("/users").send({
                                                          mail: "wrong@mail.com",
                                                          pass: "anydata" 
                                                        });
      expect(res.statusCode).to.eql(404);
    });
    it("should get 'Invalid user credentials' msg", async () => {
      const res = await request(app).put("/users").send({
                                                          mail: "wrongmail",
                                                          pass: "anydata" 
                                                        });
      expect(res.body).to.eql({msg: 'Invalid user credentials'});
    });
  });
  describe("DELETE user", () => {
    it("should get 200 when deleting a user", async () => {
      const res = await request(app).delete("/users").send({
                                                            mail: "john@travolta.com",
                                                            pass: "123456"
                                                          });
      expect(res.statusCode).to.eql(200);
    });
    it("should get 'User deleted' msg", async () => {
      const res = await request(app).delete("/users").send({
                                                            mail: "donald@trump.com",
                                                            pass: "56789"
                                                          });
      expect(res.body).to.eql({msg: 'User deleted'});
    });
    it("should get 404 when deleting a user with wrong credentials", async () => {
      const res = await request(app).delete("/users").send({
                                                            mail: "rick@astley.com",
                                                            pass: "wrongpassword" 
                                                          });
      expect(res.statusCode).to.eql(404);
    });
    it("should get 'Invalid user credentials' msg", async () => {
      const res = await request(app).delete("/users").send({
                                                            mail: "elon@musk.com",
                                                            pass: "wrongpassword" 
                                                          });
      expect(res.body).to.eql({msg: 'Invalid user credentials'});
    });
  });
});