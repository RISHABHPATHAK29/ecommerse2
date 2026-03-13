require("dotenv").config()

const { QueueClient } = require("@azure/storage-queue")
const pool = require("./db/postgres")

const queueClient = new QueueClient(
process.env.AZURE_STORAGE_CONNECTION_STRING,
process.env.QUEUE_NAME
)

async function processQueue(){

const messages = await queueClient.receiveMessages()

if(messages.receivedMessageItems.length>0){

for(const msg of messages.receivedMessageItems){

const data = JSON.parse(Buffer.from(msg.messageText,"base64").toString())

await pool.query(

"INSERT INTO orders(product_id,quantity) VALUES($1,$2)",

[data.productId,data.quantity]

)

console.log("Order saved to PostgreSQL")

}

}

}

setInterval(processQueue,5000)
