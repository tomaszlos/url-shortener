const db = require('../db')

/*
POST /api/shorten
 */

module.exports.shortenURL = (req, res) => {
  const body = req.body
  const url = body.url
  const fixedSlug = process.env.NODE_ENV === 'test' ? !!req.body.fixedSlug : false

  db.saveUrl(url, fixedSlug)
    .then((shortId) => res.status(200).json({ url: `/${ shortId }` }))
    .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
}

/*
GET /:id
 */

module.exports.redirect = (req, res) => {
  const params = req.params
  const slug = params.id

  if (!slug) {
    res.status(404).json({ error: 'Not Found' })
  } else {
    db.getUrlBySlug(slug)
      .then((url) => res.redirect(url))
      .catch(() => res.status(404).json({ error: 'Not Found' }))

  }
}
