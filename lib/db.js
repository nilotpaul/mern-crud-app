const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = mongoConnection;
