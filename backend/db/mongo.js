const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection

db.on("connected", ()=>{
console.log("MongoDB connected")
})

db.on("error",(err)=>{
console.log("MongoDB error:",err)
})

module.exports = mongoose