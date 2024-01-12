const mongoose = require("mongoose");
const Vote = require("./models/vote");
const AuthCode = require("./models/authCode");

const connectDb = async () => {
  try {
    const mongodbEndpoint = process.env.MongoDBEndpoint;
    const mongodbUser = process.env.MongoDBUser;
    const mongodbPassword = process.env.MongoDBPassword;
    const mongodbPort = process.env.MongoDBPort;
    const useSSL = process.env.MongoDBSSL === "true"; // Convert string to boolean
    const databaseName = process.env.MongoDBDatabaseName;

    const uri = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbEndpoint}:${mongodbPort}/${databaseName}?retryWrites=false`;

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      ssl: useSSL,
    };

    await mongoose.connect(uri, mongooseOptions);
    console.log("MongoDB connected");
    return {Vote, AuthCode};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { connectDb };
