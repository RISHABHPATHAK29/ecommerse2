const { QueueClient } = require("@azure/storage-queue")

const queueClient = new QueueClient(
process.env.AZURE_STORAGE_CONNECTION_STRING,
process.env.QUEUE_NAME
)

async function sendMessage(data){

try{

const message = Buffer
.from(JSON.stringify(data))
.toString("base64")

await queueClient.sendMessage(message)

console.log("Message sent to Azure Queue")

}catch(err){

console.log("Queue error:",err)

}

}

module.exports = { sendMessage }