const mongoose = require("mongoose");

const ConnectToDatabase = async (url) => {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 10000, // prevents long hangs
    });
    console.log("database connected Successfully!");
  } catch (error) {
    console.log("DB ERROR:", error);
  }
};

module.exports = ConnectToDatabase;