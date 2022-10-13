const mongoose = require('mongoose')

// connect MongoDB
mongoose.connect(process.env.MONGODB_SHORTENER_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB Error!')
})

db.once('open', () => {
  console.log('MongoDB Connected!')
})

