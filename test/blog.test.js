const supertest = require("supertest");
const app = require("../app");
const isEmailindb = require("../src/db/auth");
const blog = require("../src/db/query");
const token = require("../src/helper/token");

const request = supertest.agent(app.callback());

describe("checking blog /create", () => {
  const _verifytoken = token.verifytoken;
  const _isEmailindb = isEmailindb.isEmailindb;
  const _createblog = blog.createblog;
  afterEach(() => {
    token.verifytoken = _verifytoken;
    isEmailindb.isEmailindb = _isEmailindb;
    blog.createblog = _createblog;
  });
  test("checking istoken verify without token", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request.post("/blog/create").send();
    expect(data.body).toEqual({
      success: false,
      message: "User is not authorized or token expire",
    });
  });
  test("checking istoken verify with token", async () => {
    token.verifytoken = jest.fn(() => ({}));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request
      .post("/blog/create")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      success: false,
      message: "User is not authorized",
    });
  });
  test("checking istoken verify without email in database", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request
      .post("/blog/create")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      success: false,
      message: "user not found please create account first",
    });
  });
  test("checking title is null", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps@gmail.com" }));
    const data = await request
      .post("/blog/create")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "Enter title to create blog",
    });
  });
  test("checking description is null", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps@gmail.com" }));

    const data = await request
      .post("/blog/create")
      .send({ title: "hello" })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "Enter description to create blog",
    });
  });
  test("checking create controller", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps@gmail.com" }));
    blog.createblog = jest.fn(() => ({
      email: "apps3838@gmail.com",
      ownerID: "1234",
      blogID: "1234",
      createbyID: "1234",
      title: "hi",
      description: "hello",
    }));
    const data = await request
      .post("/blog/create")
      .send({ title: "hello", description: "hello 2" })
      .set("Authorization", "Token 1234567890");
    expect(data.text).toMatch(/true/);
  });
});

describe("checking blog /update", () => {
  const _verifytoken = token.verifytoken;
  const _isEmailindb = isEmailindb.isEmailindb;
  const _createblog = blog.createblog;
  const _isblogidindb = blog.isblogidindb;
  const _updateblog = blog.updateblog;
  afterEach(() => {
    token.verifytoken = _verifytoken;
    isEmailindb.isEmailindb = _isEmailindb;
    blog.createblog = _createblog;
    blog.isblogidindb = _isblogidindb;
    blog.updateblog = _updateblog;
  });
  test("checking istoken verify without token", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request.patch("/blog/update").send();
    // console.log(data.body)
    expect(data.body).toEqual({
      success: false,
      message: "User is not authorized or token expire",
    });
  });
  test("checking istoken verify with token", async () => {
    token.verifytoken = jest.fn(() => ({}));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request
      .patch("/blog/update")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      success: false,
      message: "User is not authorized",
    });
  });
  test("checking istoken verify without email in database", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request
      .patch("/blog/update")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      success: false,
      message: "user not found please create account first",
    });
  });
  test("checking blogID", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    const data = await request
      .patch("/blog/update")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({ status: false, message: "Blog ID enter" });
  });
  test("checking blog data", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn();
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    const data = await request
      .patch("/blog/update")
      .send({ blogID: "123456789" })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({ status: false, message: "Blog not present" });
  });
  test("checking user not authorize", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({
      blogID: "12345678",
      createbyID: "123",
    }));
    isEmailindb.isEmailindb = jest.fn(() => ({
      email: "apps3838@gmail.com",
      level: "E",
      userID: "123456789098765432",
    }));
    const data = await request
      .patch("/blog/update")
      .send({ blogID: "123456789" })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "User not Authorize to access blog",
    });
    // console.log(data.body)
  });
  test("checking user authorize", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({
      blogID: "12345678",
      createbyID: "12345678",
    }));
    isEmailindb.isEmailindb = jest.fn(() => ({
      email: "apps3838@gmail.com",
      level: "o",
      userID: "12345678",
    }));
    const data = await request
      .patch("/blog/update")
      .send({ blogID: "12345678" })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "Enter title to update blog",
    });
    // console.log(data.body)
  });
  test("checking user authorize or not", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({ blogID: "12345678" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ createbyID: "12345678" }));
    const data = await request
      .patch("/blog/update")
      .send({
        email: "apps3838@gmail.com",
        level: "E",
        userID: "12345678",
        blogID: "12345678",
      })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "Enter title to update blog",
    });
    // console.log(data.body)
  });
  test("checking title", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({ blogID: "12345678" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ createbyID: "12345678" }));
    const data = await request
      .patch("/blog/update")
      .send({
        email: "apps3838@gmail.com",
        level: "E",
        userID: "12345678",
        blogID: "12345678",
        title: "hello",
      })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "Enter description to update blog",
    });
    // console.log(data.body)
  });
  test("checking update controller", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({ blogID: "12345678" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ createbyID: "12345678" }));
    blog.updateblog = jest.fn(() => ({
      blogID: "12345678",
      title: "he",
      description: "ascwswd",
    }));
    const data = await request
      .patch("/blog/update")
      .send({
        email: "apps3838@gmail.com",
        level: "E",
        userID: "12345678",
        blogID: "12345678",
        title: "hello",
        description: "hi",
      })
      .set("Authorization", "Token 1234567890");
    expect(data.text).toMatch(/true/);
    // console.log(data.body)
  });
});

describe("checking blog /view", () => {
  const _verifytoken = token.verifytoken;
  const _isEmailindb = isEmailindb.isEmailindb;
  const _createblog = blog.createblog;
  const _isblogidindb = blog.isblogidindb;
  const _viewblog = blog.viewblog;
  afterEach(() => {
    token.verifytoken = _verifytoken;
    isEmailindb.isEmailindb = _isEmailindb;
    blog.createblog = _createblog;
    blog.isblogidindb = _isblogidindb;
    blog.viewblog = _viewblog;
  });
  test("checking istoken verify without token", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request.get("/blog/view").send();
    // console.log(data.body)
    expect(data.body).toEqual({
      success: false,
      message: "User is not authorized or token expire",
    });
  });
  test("checking istoken verify with token", async () => {
    token.verifytoken = jest.fn(() => ({}));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request
      .get("/blog/view")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      success: false,
      message: "User is not authorized",
    });
  });
  test("checking istoken verify without email in database", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn();
    const data = await request
      .get("/blog/view")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      success: false,
      message: "user not found please create account first",
    });
  });
  test("checking blogID", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    const data = await request
      .get("/blog/view")
      .send()
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({ status: false, message: "Blog ID enter" });
  });
  test("checking blog data", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn();
    isEmailindb.isEmailindb = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    const data = await request
      .get("/blog/view")
      .send({ blogID: "123456789" })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({ status: false, message: "Blog not present" });
  });
  test("checking user not authorize", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({
      blogID: "12345678",
      createbyID: "123",
    }));
    isEmailindb.isEmailindb = jest.fn(() => ({
      email: "apps3838@gmail.com",
      level: "E",
      userID: "123456789098765432",
    }));
    const data = await request
      .get("/blog/view")
      .send({ blogID: "123456789" })
      .set("Authorization", "Token 1234567890");
    expect(data.body).toEqual({
      status: false,
      message: "User not Authorize to access blog",
    });
    // console.log(data.body)
  });
  test("checking user authorize", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.viewblog=jest.fn(()=>({}))
    blog.isblogidindb = jest.fn(() => ({
      blogID: "12345678",
      createbyID: "12345678",
    }));
    isEmailindb.isEmailindb = jest.fn(() => ({
      email: "apps3838@gmail.com",
      level: "o",
      userID: "12345678",
    }));
    const data = await request
      .get("/blog/view")
      .send({ blogID: "12345678" })
      .set("Authorization", "Token 1234567890");
      expect(data.text).toMatch(/true/)
    // console.log(data.body)
  });
  test("checking user authorize or not", async () => {
    token.verifytoken = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    blog.isblogidindb = jest.fn(() => ({ blogID: "12345678" }));
    isEmailindb.isEmailindb = jest.fn(() => ({ createbyID: "12345678" }));
    blog.viewblog=jest.fn(()=>({}))
    const data = await request
      .get("/blog/view")
      .send({
        email: "apps3838@gmail.com",
        level: "E",
        userID: "12345678",
        blogID: "12345678",
      })
      .set("Authorization", "Token 1234567890");
    expect(data.text).toMatch(/true/)
    // console.log(data.body)
  });
});
