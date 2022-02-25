const supertest = require("supertest");

const app = require("../app");
const authdata = require("../src/db/auth");
const  hashingpassword  = require("../src/helper/hashing");
const  gentoken = require("../src/helper/token");
const resetpassword = require("../src/validator/auth/resetpasswordvalidator");
const verifytoken = require("../src/helper/token")

const request = supertest.agent(app.callback())

describe("checking /login",()=>{
    describe('checking email validator',() => {
        const _isEmailindb=authdata.isEmailindb
    
        afterEach(()=>{
            authdata.isEmailindb=_isEmailindb
        })
        
        test("is Password Enter Or not", async () => {
            authdata.isEmailindb=jest.fn(()=>({
                status: true
            }))
    
            const data=await request.post("/login").send({
                email:"owner1@gmail.com",
            })
            expect(data.body).toEqual({ status: false, message: "Please Enter password" })
        })
        
        test("if email is undefined",async()=>{
            const data=await request.post("/login").send({})
            expect(data.body).toEqual({ status: false, message: 'Please Enter email' })
        })
    
        test("if email regex not proper",async()=>{
            const data=await request.post("/login").send({
                email:"owner"
            })
            expect(data.body).toEqual({ status: false, message: 'Please Enter right Email' })
        })
     })

     describe("checking password validator",()=>{
    
        test('if password is less than 8 char',async() => { 
            
           authdata.isEmailindb=jest.fn(()=>({
           status: true
       }))
           const data=await request.post("/login").send({
               email:"owner1@gmail.com",
               password:"12345"
           })
           expect(data.body).toEqual({
               status: false,
               message: "Please Enter right password more then 8 char",
             })
        })
   
    })

    describe("checking login controller",()=>{
    
        const _hashingpasswordverify = hashingpassword.hashingpasswordverify
        const _gentoken = gentoken.generatetoken
        afterEach(()=>{
            hashingpassword.hashingpasswordverify = _hashingpasswordverify
            gentoken.generatetoken=_gentoken
        })
        test('checking login controller output',async() => { 
            hashingpassword.hashingpasswordverify=jest.fn(()=>true)
            gentoken.generatetoken=jest.fn(()=>("qwedfghwedfghwerfghwedfghwedfgnwsdfvtyukiiuytredfghjkkjhgfd"))
            
           authdata.isEmailindb=jest.fn(()=>({
           status: true,
           message:"qwedfghwedfghwerfghwedfghwedfgnwsdfvtyukiiuytredfghjkkjhgfd"
       }))
           const data=await request.post("/login").send({
               email:"owner1@gmail.com",
               password:"12345678"
           })
           expect(data.body.status).toBe(true)
        })
   
    })

})

describe("checking /forgetpassword",()=>{
    const _isEmailindb=authdata.isEmailindb;
    
    afterEach(()=>{
        authdata.isEmailindb=_isEmailindb
    })
    test('is Email undefined', async() => { 
        const data=await request.post("/forgetpassword").send({})
        expect(data.body).toEqual({ status: false, message: "Please Enter email" })
     })
    
    test('is Email Ragex proper', async() => { 
        const data=await request.post("/forgetpassword").send({
            email:"akshat"
        })
        expect(data.body).toEqual({ status: false, message: "Please Enter right Email" })
    })

    test('Email verify',async()=>{ 
        authdata.isEmailindb=jest.fn(()=>null)

        const data=await request.post("/forgetpassword").send({email:"akshat@yahoo.com"})
        expect(data.body).toEqual( { status: false, message: "NO user found" })
    })

    test('forget password controller',async() => {
        authdata.isEmailindb=jest.fn(()=>true)
        gentoken.generatetoken=jest.fn(()=>({status:true}))
        const data=await request.post("/forgetpassword").send({email:"akshat@yahoo.com"})
        expect(data.text).toMatch(/true/)
    })
})

describe("checking /resetpassword",()=>{
    afterEach = ()=>{
        verifytoken.verifytoken = _verifytoken
    }
    test('password verify', async() => {
        verifytoken.verifytoken=jest.fn(()=>({
            status: true
        }))
        const data=await request.post("/resetpassword").send({})
        console.log(data.body)
        // expect(data.body).toEqual( { success: false, message: 'Token Expire' })
     })
})



