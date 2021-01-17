const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    shortId: {
      type: String,
      index: true,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: true
    },
    clicks: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true })

mongoose.model('ShortUrl', schema)

module.exports = mongoose.model('ShortUrl')
