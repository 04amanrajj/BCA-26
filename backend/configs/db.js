const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnection = mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to DB");
}).catch((error) => {
  console.error(`Failed to connect to DB: ${error.message}`);
});
