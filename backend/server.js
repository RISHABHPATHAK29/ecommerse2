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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
