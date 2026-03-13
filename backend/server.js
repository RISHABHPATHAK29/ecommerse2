const express = require("express")
const mongoose = require("mongoose")
const path = require("path")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* SERVE FRONTEND FILES */
app.use(express.static(path.join(__dirname, "../e-commerce-project-master")))

const productRoutes = require("./routes/products")
const orderRoutes = require("./routes/orders")

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

async function startServer() {

  try {

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000
    })

    console.log("MongoDB connected")

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
      console.log("Server running on port", PORT)
    })

  } catch (err) {

    console.error("MongoDB connection error:", err)

  }

}

startServer()
