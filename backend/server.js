require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

require("./db/mongo")

const productRoutes = require("./routes/products")
const orderRoutes = require("./routes/orders")

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.listen(5000, () => {

console.log("Server running on port 5000")

})