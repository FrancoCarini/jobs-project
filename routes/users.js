const express = require('express')
const router = express.Router()

const { newUserForm } = require('../controllers/users')

router.get('/new', newUserForm)

module.exports = router