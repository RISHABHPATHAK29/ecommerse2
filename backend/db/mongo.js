const mongoose = require("mongoose")

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })

    console.log("MongoDB connected")

  } catch (err) {
    console.log("MongoDB error:", err)
  }
}

module.exports = connectDB
