const express = require("express")
const router = express.Router()

const pool = require("../db/postgres")
const { sendMessage } = require("../services/queueService")

/* CREATE ORDER */
router.post("/", async (req,res)=>{

try{

const order = {
productId:req.body.productId,
quantity:req.body.quantity
}

await sendMessage(order)

res.json({
message:"Order sent to queue"
})

}catch(err){

console.log(err)
res.status(500).json({error:err.message})

}

})


/* GET ORDERS FROM POSTGRES */

router.get("/", async(req,res)=>{

try{

const result = await pool.query("SELECT * FROM orders ORDER BY id DESC")

res.json(result.rows)

}catch(err){

console.log(err)
res.status(500).json({error:err.message})

}

})

module.exports = router
