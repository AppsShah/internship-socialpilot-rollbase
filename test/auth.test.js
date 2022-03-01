const supertest = require("supertest");

const app = require("../app");
const authdata = require("../src/db/auth");
const hashingpassword = require("../src/helper/hashing");
const gentoken = require("../src/helper/token");
const verifytoken = require("../src/helper/token");

// const istokenverify = require("../src/middleware/istokenverify");

const request = supertest.agent(app.callback());

describe("checking /login", () => {
  describe("checking email validator", () => {
    const _isEmailindb = authdata.isEmailindb;

    afterEach(() => {
      authdata.isEmailindb = _isEmailindb;
    });

    test("is Password Enter Or not", async () => {
      authdata.isEmailindb = jest.fn(() => ({
        status: true,
      }));

      const data = await request.post("/login").send({
        email: "owner1@gmail.com",
      });
      expect(data.body).toEqual({
        status: false,
        message: "Please Enter password",
      });
    });

    test("if email is undefined", async () => {
      const data = await request.post("/login").send({});
      expect(data.body).toEqual({
        status: false,
        message: "Please Enter email",
      });
    });

    test("if email regex not proper", async () => {
      const data = await request.post("/login").send({
        email: "owner",
      });
      expect(data.body).toEqual({
        status: false,
        message: "Please Enter right Email",
      });
    });
  });

  describe("checking password validator", () => {
    test("if password is less than 8 char", async () => {
      authdata.isEmailindb = jest.fn(() => ({
        status: true,
      }));
      const data = await request.post("/login").send({
        email: "owner1@gmail.com",
        password: "12345",
      });
      expect(data.body).toEqual({
        status: false,
        message: "Please Enter right password more then 8 char",
      });
    });
  });

  describe("checking login controller", () => {
    const _hashingpasswordverify = hashingpassword.hashingpasswordverify;
    const _gentoken = gentoken.generatetoken;
    afterEach(() => {
      hashingpassword.hashingpasswordverify = _hashingpasswordverify;
      gentoken.generatetoken = _gentoken;
    });
    test("checking login controller output", async () => {
      hashingpassword.hashingpasswordverify = jest.fn(() => true);
      gentoken.generatetoken = jest.fn(
        () => "qwedfghwedfghwerfghwedfghwedfgnwsdfvtyukiiuytredfghjkkjhgfd"
      );

      authdata.isEmailindb = jest.fn(() => ({
        status: true,
        message: "qwedfghwedfghwerfghwedfghwedfgnwsdfvtyukiiuytredfghjkkjhgfd",
      }));
      const data = await request.post("/login").send({
        email: "owner1@gmail.com",
        password: "12345678",
      });
      expect(data.body.status).toBe(true);
    });
  });
});

describe("checking /forgetpassword", () => {
  const _isEmailindb = authdata.isEmailindb;

  afterEach(() => {
    authdata.isEmailindb = _isEmailindb;
  });
  test("is Email undefined", async () => {
    const data = await request.post("/forgetpassword").send({});
    expect(data.body).toEqual({ status: false, message: "Please Enter email" });
  });

  test("is Email Ragex proper", async () => {
    const data = await request.post("/forgetpassword").send({
      email: "akshat",
    });
    expect(data.body).toEqual({
      status: false,
      message: "Please Enter right Email",
    });
  });

  test("Email verify", async () => {
    authdata.isEmailindb = jest.fn(() => null);

    const data = await request
      .post("/forgetpassword")
      .send({ email: "akshat@yahoo.com" });
    expect(data.body).toEqual({ status: false, message: "NO user found" });
  });

  test("forget password controller", async () => {
    authdata.isEmailindb = jest.fn(() => true);
    gentoken.generatetoken = jest.fn(() => ({ status: true }));
    const data = await request
      .post("/forgetpassword")
      .send({ email: "akshat@yahoo.com" });
    expect(data.text).toMatch(/true/);
  });
});

describe("checking /resetpassword", () => {
  const _isEmailindb = authdata.isEmailindb;
  const _resetpassword = authdata.resetpassword;
  afterEach = () => {
    verifytoken.verifytoken = _verifytoken;
    authdata.isEmailindb = _isEmailindb;
    authdata.resetpassword = _resetpassword;
  };
  test("token authentication", async () => {
    verifytoken.verifytoken = jest.fn(() => ({}));
    const data = await request.post("/resetpassword").send({});
    expect(data.body).toEqual({ success: false, message: "Token Expire" });
    // expect(data.body).toEqual( { success: false, message: 'Token Expire' })
  });
  test("password verify", async () => {
    verifytoken.verifytoken = jest.fn(() => ({
      email: "apps@3838@gmail.com",
    }));
    const data = await request.post("/resetpassword").send();
    expect(data.body).toEqual({ success: false, message: "Enter Password" });
    // expect(data.body).toEqual( { success: false, message: 'Token Expire' })
  });

  test("password verify for 8 chararacter", async () => {
    verifytoken.verifytoken = jest.fn(() => ({
      email: "apps3838@gmail.com",
    }));
    const data = await request.post("/resetpassword").send({
      password: "12345",
    });
    // console.log(data.body)
    expect(data.body).toEqual({
      success: false,
      message: "Enter Password more then 8 char",
    });
  });

  test("does user enter wrong password", async () => {
    authdata.isEmailindb = jest.fn(() => null);
    const data = await request.post("/resetpassword").send({
      password: "12345678",
    });
    expect(data.body).toEqual({
      success: false,
      message: "user Entered Wrong email",
    });
  });
  test("testing reset password controller", async () => {
    authdata.isEmailindb = jest.fn(() => "true");
    authdata.resetpassword = jest.fn(() => ({ status: true }));
    const data = await request.post("/resetpassword").send({
      password: "12345678",
    });
    expect(data.body).toEqual({
      success: true,
      message: "password change successfully",
    });
  });
});

describe("checking /invite route", () => {
  const _verifytoken = verifytoken.verifytoken;
  const _isEmailindb = authdata.isEmailindb;
  afterEach = () => {
    verifytoken.verifytoken = _verifytoken;
    authdata.isEmailindb = _isEmailindb;
  };
  test("token authentication", async () => {
    verifytoken.verifytoken = jest.fn(() => ({
      email: "apps3838@gmail.com",
    }));
    authdata.isEmailindb = jest.fn(() => ({
      email: "apps3838@gmail.com",
      password: "werfg34rtgtrerfdwdf",
      level: "o",
    }));
    const data = await request
      .post("/invite")
      .send({ level: "o" })
      .set("Authorization", "Token 1234567890");
    // console.log(data.body).toBe({status:true})
    expect(data.text).toMatch(/true/);
    // expect(data.body).toEqual( { success: false, message: 'Token Expire' })
  });
});

describe("checking /inviteaccept", () => {
  const _isEmailindb = authdata.isEmailindb;
  const _verifytoken = verifytoken.verifytoken;
  const _inviteuseradd = authdata.inviteuseradd;
  afterEach = () => {
    authdata.isEmailindb = _isEmailindb;
    verifytoken.verifytoken = _verifytoken;
    authdata.inviteuseradd = _inviteuseradd;
  };
  test("checking username", async () => {
    const data = await request.post("/inviteaccept").send({});
    expect(data.body).toEqual({
      status: false,
      message: "Please Enter Username",
    });
  });
  test("checking email", async () => {
    authdata.isEmailindb = jest.fn(() => ({ email: "apps3838@gmail.com" }));
    const data = await request.post("/inviteaccept").send({
      username: "akshat",
      email: "apps3838@gmail.com",
    });
    expect(data.body).toEqual({
      status: false,
      message: "User Already Present",
    });
  });

  test("checking password", async () => {
    authdata.isEmailindb = jest.fn();
    const data = await request.post("/inviteaccept").send({
      username: "akshat",
      email: "apps3838@gmail.com",
      password: "12345",
    });
    expect(data.body).toEqual({
      status: false,
      message: "Please Enter right password more then 8 char",
    });
  });
  test("checking without photourl", async () => {
    authdata.isEmailindb = jest
      .fn()
      .mockImplementationOnce()
      .mockImplementationOnce(() => ({ ownerID: "12345678" }));
    authdata.inviteuseradd = jest.fn(() => ({}));
    verifytoken.verifytoken = jest.fn(() => ({
      owneremail: "hello@gmail.com",
    }));
    // verifytoken.verifytoken=jest.fn();
    const data = await request.post("/inviteaccept").send({
      username: "akshat",
      email: "apps3838@gmail.com",
      password: "12345678",
    });
    expect(data.body).toEqual({
      status: true,
      message: "User added Successfully",
    });
  });

  test("testing photourl regex", async () => {
    const data = await request.post("/inviteaccept").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
      photourl: "",
    });
    expect(data.body).toEqual({
      status: false,
      message: "Enter Valid Link to save photo",
    });
  });
  test("testing photourl content-type", async () => {
    const data = await request.post("/inviteaccept").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
      photourl: "https://images.unsplash.com/photo-1508921912186",
    });
    expect(data.body).toEqual({
      status: false,
      message: "Enter jpeg/jpg photo only",
    });
  });
  test("testing photourl and go to controller", async () => {
    authdata.isEmailindb = jest
      .fn()
      .mockImplementationOnce()
      .mockImplementationOnce(() => ({ ownerID: "12345678" }));
    authdata.inviteuseradd = jest.fn(() => ({}));
    verifytoken.verifytoken = jest.fn(() => ({
      owneremail: "hello@gmail.com",
    }));
    const data = await request.post("/inviteaccept").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
      photourl:
        "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    });
    expect(data.body).toEqual({
      status: true,
      message: "User added Successfully",
    });
  });
});

describe("checking /signup", () => {
  const _isEmailindb = authdata.isEmailindb;
  afterEach(() => {
    authdata.isEmailindb = _isEmailindb;
  });
  test("testing username", async () => {
    const data = await request.post("/signup").send({});
    expect(data.body).toEqual({
      status: false,
      message: "Please Enter Username",
    });
  });
  test("testing email", async () => {
    const data = await request.post("/signup").send({ username: "akshat" });
    expect(data.body).toEqual({ status: false, message: "Please Enter email" });
  });
  test("testing email regex", async () => {
    const data = await request
      .post("/signup")
      .send({ username: "akshat", email: "akshat@123" });
    expect(data.body).toEqual({
      status: false,
      message: "Please Enter right Email",
    });
  });
  test("testing email is present in database", async () => {
    authdata.isEmailindb = jest.fn(() => ({ email: "akshat@yahoo.com" }));
    const data = await request
      .post("/signup")
      .send({ username: "akshat", email: "akshat@yahoo.com" });
    expect(data.body).toEqual({
      status: false,
      message: "user Already present",
    });
  });
  test("testing password", async () => {
    authdata.isEmailindb = jest.fn();
    const data = await request
      .post("/signup")
      .send({ username: "akshat", email: "akshat@yahoo.com" });
    expect(data.body).toEqual({
      status: false,
      message: "Please Enter password",
    });
  });
  test("testing password length", async () => {
    authdata.signup = jest.fn();
    authdata.isEmailindb = jest.fn();
    const data = await request.post("/signup").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
    });
    expect(data.body).toEqual({
      status: true,
      message: "Data Added Successfully",
    });
  });
  test("testing photourl regex", async () => {
    const data = await request.post("/signup").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
      photourl: "",
    });
    expect(data.body).toEqual({
      status: false,
      message: "Enter Valid Link to save photo",
    });
  });
  test("testing photourl content-type", async () => {
    const data = await request.post("/signup").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
      photourl: "https://images.unsplash.com/photo-1508921912186",
    });
    expect(data.body).toEqual({
      status: false,
      message: "Enter jpeg/jpg photo only",
    });
  });
  test("testing photourl and go to controller", async () => {
    const data = await request.post("/signup").send({
      username: "akshat",
      email: "akshat@yahoo.com",
      password: "123456778",
      photourl:
        "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    });
    expect(data.body).toEqual({
      status: true,
      message: "Data Added Successfully",
    });
  });
});
