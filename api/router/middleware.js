const utils = require('../utils')

/*
Middleware validating URL
 */

module.exports.validateUrl = (req, res, next) => {
  const body = req.body
  const url = body.url

  if(!url || !url.length || !utils.validateUrl(url)) {
    res.status(422).json({error: 'Unprocessable Entity'})
  } else {
    next()
  }
}
