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

router.get('/objecting-entity-name', function (req, res) {
  req.session.scenario = {}
  res.render('objecting-entity-name')
})

router.post('/objecting-entity-name', function (req, res) {
  var fullName = req.session.data['full-name']
  var errors = []
  if (fullName === '') {
    errors.push({
      text: 'Enter your full name',
      href: '#full-name'
    })
    res.render('objecting-entity-name', {
      errorName: true,
      errorList: errors
    })
  } else if (fullName === '@') {
    errors.push({
      text: 'Full name must only include letters a to z, hyphens, spaces and apostrophes',
      href: '#full-name'
    })
    res.render('objecting-entity-name', {
      errorNametwo: true,
      errorList: errors
    })
  } else {
    res.redirect('objecting-entity-contact-details')
  }
})

router.get('/objecting-entity-contact-details', function (req, res) {
  req.session.scenario = {}
  res.render('objecting-entity-contact-details')
})

router.post('/objecting-entity-contact-details', function (req, res) {
  var email = req.session.data['email']
  var phoneNumber = req.session.data['telephone-number']
  var errors = []
  if (email === '') {
    errors.push({
      text: 'Enter your email address',
      href: '#email'
    })
    res.render('obliged-entity-details-telephone', {
      errorEmail: true,
      errorList: errors
    })
  } else {
    res.redirect('/company-number')
  }
})

router.get('/company-number', function (req, res) {
  req.session.scenario = {}
  res.render('company-number')
})

router.post('/company-number', function (req, res) {
  console.log('full name = ' + req.session.data['full-name'] +
              'email = ' + req.session.data['email'] +
              'telephone number = ' + req.session.data['telephone-number'] +
              'company number = ' + req.session.data['company-number'])
  var companyNumber = req.session.data['company-number']
  var errors = []
  if (companyNumber === '') {
    errors.push({
      text: 'Enter the company number',
      href: '#company-number'
    })
    res.render('company-number', {
      errorNum: true,
      errorList: errors
    })
  } else {
    res.redirect('/review-company')
  }
})
