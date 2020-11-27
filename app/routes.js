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

router.get('/sign-in', function (req, res) {
  res.render('sign-in')
})

router.post('/sign-in', function (req, res) {
  req.session.email = req.body.email
  res.redirect('/objector-organisation')
})
router.get('/objector-organisation', function (req, res) {
  res.render('objector-organisation', {
    scenario: req.session.scenario
  })
})
router.post('/objector-organisation', function (req, res) {
  var objector = req.session.data['objector']
  var scenario = req.session.scenario

  switch (objector) {
    case 'objector':
      res.redirect('/objecting-entity-name')
      break
    case 'organisation':
      res.redirect('/objecting-entity-organisation')
      break
  }
})
router.get('/objecting-entity-name', function (req, res) {
  var id = 0
  var info = ''
  // if (req.query.id) {
    // id = req.query.id
    // info = req.session.data['full-name'][id]
    // res.render('objecting-entity-name', {
      // id: id,
      // info: info
    // })
  // } else {
  res.render('objecting-entity-name')
})

router.post('/objecting-entity-name', function (req, res) {
  var name = req.session.data['name']
  var divulgeInfo = req.session.data['divulge-info']
  // var editId = req.body.editId
  var errors = []

  if (name === '') {
    errors.push({
      text: 'Enter your full name',
      href: '#name'
    })
    res.render('objecting-entity-name', {
      errorName: true,
      errorList: errors
    })
  } if (name === '@') {
    errors.push({
      text: 'Full name must only include letters a to z, hyphens, spaces and apostrophes',
      href: '#name'
    })
    res.render('objecting-entity-name', {
      errorNametwo: true,
      errorList: errors
    })
  } if (divulgeInfo === 'undefined') {
    errors.push({
      text: 'Select yes if we can share your details',
      href: '#divulge-info'
    })
    res.render('objecting-entity-name', {
      errorDivulge: true,
      errorList: errors
    })
  } else {
    res.redirect('/company-number')
  }
})
router.get('/objecting-entity-organisation', function (req, res) {
  var id = 0
  var info = ''
  // if (req.query.id) {
    // id = req.query.id
    // info = req.session.data['full-name'][id]
    // res.render('objecting-entity-name', {
      // id: id,
      // info: info
    // })
  // } else {
  res.render('objecting-entity-organisation')
})

router.post('/objecting-entity-organisation', function (req, res) {
  var name = req.session.data['name']
  var divulgeInfo = req.session.data['divulge-info']
  // var editId = req.body.editId
  var errors = []

  if (name === '') {
    errors.push({
      text: 'Enter the name of your organisation',
      href: '#name'
    })
    res.render('objecting-entity-organisation', {
      errorName: true,
      errorList: errors
    })
  } if (name === '@') {
    errors.push({
      text: 'Full name must only include letters a to z, hyphens, spaces and apostrophes',
      href: '#name'
    })
    res.render('objecting-entity-organisation', {
      errorNametwo: true,
      errorList: errors
    })
  } if (divulgeInfo === 'undefined') {
    errors.push({
      text: 'Select yes if we can share your details',
      href: '#divulge-info'
    })
    res.render('objecting-entity-organisation', {
      errorDivulge: true,
      errorList: errors
    })
  } else {
    res.redirect('/objector-details')
  }
})

router.get('/objector-details', function (req, res) {
  req.session.scenario = {}
  res.render('objector-details')
})

router.post('/objector-details', function (req, res) {
  var clientName = req.session.data.clientName
  var errors = []
  if (clientName === '') {
    errors.push({
      text: 'Enter the name of the client you are objecting on behalf of',
      href: '#clientName'
    })
    res.render('objector-details', {
      errorClientName: true,
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
    req.session.scenario = require('../app/assets/data/scenarios/' + companyNumber)
    res.redirect('/confirm-company')
  }
})
router.get('/confirm-company', function (req, res) {
  var scenario = req.session.scenario

  res.render('confirm-company', {
    scenario: scenario
  })
  router.post('/confirm-company', function (req, res) {
    res.redirect('/enter-information')
  })
})
router.get('/notice-expired', function (req, res) {
  var scenario = req.session.scenario

  res.render('notice-expired', {
    scenario: scenario
  })
})
router.get('/no-gazette', function (req, res) {
  var scenario = req.session.scenario

  res.render('no-gazette', {
    scenario: scenario
  })
})
router.get('/enter-information', function (req, res) {
  var id = req.query.id
  var scenario = req.session.scenario

  res.render('enter-information', {
    scenario: scenario
  })
  router.post('/enter-information', function (req, res) {
    var information = req.session.data.information
    res.redirect('/upload')
  })
})
router.get('/upload', function (req, res) {
  var id = req.query.id

  res.render('upload', {
  })
})
router.post('/upload', function (req, res) {
  var doc = req.body.fileUpload
  var fileName = []

  fileName = doc.split('.').pop()

  res.render('upload', {
    doc: doc.split('\\')
  })

  req.session.doc = req.body.fileUpload
  res.redirect('/upload')
})
router.get('/check-your-answers', function (req, res) {
  var scenario = req.session.scenario
  var objector = req.session.data['objector']
  var clientName = req.session.data['clientName']
  var name = req.session.data['name']
  var divulgeInfo = req.session.data['divulge-info']
  var email = req.session.data.email
  var information = req.session.data.information
  var documents = req.session.doc
  var i

  for (i = 0; i < req.session.data.length; i++) {
    req.session.data[i].complete = true
  }

  res.render('check-your-answers', {
    scenario: scenario,
    objector: objector,
    clientName: clientName,
    name: name,
    divulgeInfo: divulgeInfo,
    email: email,
    information: information,
    documents: documents
  })
  router.post('/check-your-answers', function (req, res) {
    res.redirect('/confirmation')
  })
})
router.get('/confirmation', function (req, res) {
  var scenario = req.session.scenario
  var email = req.session.data.email

  res.render('confirmation', {
    scenario: scenario,
    email: email
  })
})
