const mongoose = require('mongoose');
const fs = require('fs');
const { GridFSBucket } = require('mongodb');

// Set strictQuery to false to suppress the deprecation warning.
mongoose.set('strictQuery', false);

async function connectUploadAndRetrieveFile() {
  try {
    // Connect to MongoDB using your MONGODB_URI environment variable.
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 20,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      waitQueueTimeoutMS: 5000,
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      tls: true,
      tlsAllowInvalidHostnames: true,
    });
    console.log('Successfully connected to MongoDB');

    // Get the native MongoDB driver's database object.
    const db = mongoose.connection.db;

    // Create a GridFS bucket using the bucketName "files".
    const bucket = new GridFSBucket(db, { bucketName: 'files' });

    // Path to the local file to upload.
    const localFilePath = './sample.txt';

    // Ensure the file exists.
    if (!fs.existsSync(localFilePath)) {
      console.error(`Error: File "${localFilePath}" does not exist.`);
      process.exit(1);
    }

    // Create a read stream from the local file and open an upload stream to GridFS.
    const readStream = fs.createReadStream(localFilePath);
    const uploadStream = bucket.openUploadStream('sample.txt');

    // Upload the file by piping the read stream into the GridFS upload stream.
    await new Promise((resolve, reject) => {
      readStream.pipe(uploadStream)
        .on('error', error => {
          console.error('Error uploading file:', error);
          reject(error);
        })
        .on('finish', () => {
          console.log('File successfully uploaded to GridFS with _id:', uploadStream.id);
          resolve();
        });
    });

    // Now, retrieve the file from GridFS by its filename.
    const downloadStream = bucket.openDownloadStreamByName('sample.txt');
    let fileData = '';

    // Set encoding so that we read as text.
    downloadStream.setEncoding('utf8');

    // Accumulate the data chunks.
    downloadStream.on('data', chunk => {
      fileData += chunk;
    });

    // When the download is complete, print the file content.
    await new Promise((resolve, reject) => {
      downloadStream.on('end', () => {
        console.log('File download complete. File content:');
        console.log(fileData);
        resolve();
      });
      downloadStream.on('error', error => {
        console.error('Error downloading file:', error);
        reject(error);
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('Error in connecting/uploading/retrieving:', error);
    process.exit(1);
  }
}

connectUploadAndRetrieveFile();
