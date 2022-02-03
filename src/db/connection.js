const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://akshat:akshat12345@cluster0.wtpyq.mongodb.net/internship?retryWrites=true&w=majority";

const conn = MongoClient;
let mongoClient = new MongoClient(url,{});
mongoClient
  .connect()
  .then(() => console.log("DB connected successfully"))
  .catch((e) => console.log("error" + e));
const mongoDB=mongoClient
module.exports=mongoDB;