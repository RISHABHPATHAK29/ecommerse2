const { BlobServiceClient } = require("@azure/storage-blob")

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
const containerName = process.env.BLOB_CONTAINER

const blobServiceClient =
BlobServiceClient.fromConnectionString(connectionString)

async function uploadImage(file){

const containerClient =
blobServiceClient.getContainerClient(containerName)

const blobName = Date.now() + "-" + file.originalname

const blockBlobClient =
containerClient.getBlockBlobClient(blobName)

await blockBlobClient.uploadData(file.buffer)

return blockBlobClient.url
}

module.exports = { uploadImage }