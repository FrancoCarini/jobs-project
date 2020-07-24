const express = require('express')
const router = express.Router()

const { newJobForm } = require('../controllers/jobs')

router.get('/new', newJobForm)

module.exports = router