const express = require("express")
const router = express.Router()

const multer = require("multer")

/* FIXED MULTER CONFIG */
const storage = multer.memoryStorage()

const upload = multer({
 storage: storage,
 limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

const Product = require("../models/Product")
const { uploadImage } = require("../services/blobService")


/* CREATE PRODUCT */
router.post("/", upload.single("image"), async (req,res)=>{

try{

if(!req.file){
 return res.status(400).json({error:"Image not uploaded"})
}

console.log("File received:", req.file.originalname)

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


/* GET PRODUCTS */
router.get("/", async(req,res)=>{

const products = await Product.find()

res.json(products)

})

module.exports = router
