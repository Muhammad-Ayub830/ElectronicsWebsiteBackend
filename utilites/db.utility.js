const mongoose = require("mongoose")
const ConnectToDatabase = async (url) => {
  try {
    await mongoose.connect(url)
    console.log('database connected Successfully!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = ConnectToDatabase
