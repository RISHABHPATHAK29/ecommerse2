require("dotenv").config()

const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

// Serve frontend
app.use(express.static(path.join(__dirname, "../e-commerce-project-master")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../e-commerce-project-master/index.html"))
})

require("./db/mongo")

const productRoutes = require("./routes/products")
const orderRoutes = require("./routes/orders")

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
