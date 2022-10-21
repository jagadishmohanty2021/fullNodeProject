const mongoose = require('mongoose');
let mongodbPath = "mongodb://localhost:27017/learning"
const conn=mongoose.createConnection(mongodbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

conn.on('connected', () => {
  console.log('connected to mongodb');
});

conn.on('disconnected', () => {
  console.log('connection disconnected');
});
module.exports={
  conn
}
