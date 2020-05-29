const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router
router.get('/', function (req, res) {
  req.session.scenario = {}
  res.render('start')
})
router.get('/start', function (req, res) {
  req.session.scenario = {}
  res.render('start')
})
