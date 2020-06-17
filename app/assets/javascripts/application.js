/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

$('.govuk-file-upload').change(function () {
  var documentPathArray = []

  console.log($(this).val())
  documentPathArray = $(this).val().split('\\')
  console.log(documentPathArray)
  $('.upload-status__title').html(documentPathArray[2])
  $('.upload-status').show()
  $('.upload-status-heading').show()
  $('.file-upload').hide()
  $('.indicator').animate({
    width: ['100%', 'easeInOutCirc']
  }, {
    duration: 5000,
    step: function (now, fx) {
      $('.upload-status__value').html(Math.ceil(now))
    },
    complete: function () {
      $('#file-upload-form').submit()
    }
  })
})

$('.upload-status__link').click(function () {
  $('.indicator').stop()
  $('.upload-status').hide()
  $('.indicator').width('0')
  $('.upload-status__value').html('0')
  $('.upload-status-heading').hide()
  $('.file-upload').show()
  $('.govuk-file-upload').val('')
  return false
})
