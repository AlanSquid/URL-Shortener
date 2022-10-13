const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  sourceURL: { type: String, require: true },
  shortURL: { type: String, require: true, unique: true }
})

module.exports = mongoose.model('URL', urlSchema)