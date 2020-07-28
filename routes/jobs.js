const express = require('express')
const router = express.Router()

const { newJobForm, 
  addJob, 
  getJob, 
  editJobForm, 
  editJob } = require('../controllers/jobs')

router.route('/new')
  .get(newJobForm)
  .post(addJob)

router.get('/:url', getJob)
router.route('/edit/:url')
  .get(editJobForm)
  .post(editJob)

module.exports = router