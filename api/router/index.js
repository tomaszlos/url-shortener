const express = require('express')
const router = express.Router()
const controller = require('../controllers')
const middleware = require('./middleware')

router.get('/:id', controller.redirect)
router.post('/api/shorten', middleware.validateUrl, controller.shortenURL)

module.exports = router
