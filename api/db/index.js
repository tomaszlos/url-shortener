const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const ShortUrl = require('./models/ShortUrl')

let connection = null

/*
Function for saving URL with collision handling
 */

module.exports.saveUrl = (url, fixedSlug = false) => new Promise(async (resolve, reject) => {
  let error = null
  let shortId

  if (!connection) {
    reject()
  }

  /*
  Collision handling magic with fixedSlug for testing purposes
   */

  do {
    shortId = (fixedSlug && !error ? 'test' : nanoid(12))
    const doc = new ShortUrl({
      shortId: shortId,
      url: url
    })

    error = await new Promise((resolve1) => doc.save((err) => {
      if (err) {
        const code = err.code
        if (code === 11000) console.error('Collision spotted!')
        resolve1(code)
      } else {
        resolve1(false)
      }
    }))

    if (!error) resolve(shortId)
    else if (error !== 11000) reject()
  } while (error)
})

/*
Retrieve Url by slug
 */

module.exports.getUrlBySlug = (slug) => new Promise(async (resolve, reject) => {
  ShortUrl.findOne({ shortId: slug }, (err, doc) => {
    if (doc) {
      /*
      Resolve right away - no need to wait for stats
       */

      resolve(doc.url)

      /*
      Update stats
       */

      doc.clicks++
      doc.save()
    } else {
      reject()
    }
  })
})

/*
Helpers
 */

module.exports.disconnect = async () => {
  await mongoose.disconnect()
}

module.exports.drop = async () => {
  if (connection) {
    await mongoose.connection.db.dropDatabase()
  }
}

/*
Launch DB connection with reconnect interval
 */

new Promise(resolve => {
  const uri = `mongodb://db/shortener${ process.env.NODE_ENV === 'test' ? '-test' : '' }`
  const conn = setInterval(function retry () {
    connection = mongoose.connect(uri, function (err) {
      if (err) {
        console.error(`Failed to connect to mongo - retrying in 5 sec`, err.data);
      } else {
        clearInterval(conn)
        resolve()
      }
    });
    return retry
  }(), 5000)
}).then()
