const express = require("express")
const router = express.Router()

const multer = require("multer")
const upload = multer()

const Product = require("../models/Product")
const { uploadImage } = require("../services/blobService")

router.post("/", upload.single("image"), async (req,res)=>{

try{

const imageUrl = await uploadImage(req.file)

const product = new Product({
 name: req.body.name,
 price: req.body.price,
 image: imageUrl
})

await product.save()

res.json(product)

}catch(error){

console.log(error)
res.status(500).json({error:error.message})

}

})

router.get("/", async(req,res)=>{

const products = await Product.find()
res.json(products)

})

module.exports = router