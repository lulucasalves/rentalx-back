require('dotenv/config')
const { S3 } = require('aws-sdk')
const fs = require('fs')
const { resolve } = require('path')
const upload = require('../upload')
const mime = require('mime')

const client = new S3({ region: process.env.AWS_BUCKET_REGION })

async function SaveS3Storage(file, folder) {
  const originalName = resolve(`${upload.tmpFolder}/${folder}`, file)

  const fileContent = await fs.promises.readFile(originalName)

  const ContentType = mime.getType(originalName)

  await client
    .putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    })
    .promise()

  await fs.promises.unlink(originalName)

  return file
}

async function DeleteS3Storage(file, folder) {
  await client
    .deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    })
    .promise()
}

module.exports = { SaveS3Storage, DeleteS3Storage }
