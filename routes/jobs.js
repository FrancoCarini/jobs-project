const express = require('express')
const router = express.Router()

const { isUserAuth } = require('../middleware/isAuth')

const { newJobForm, 
  addJob, 
  getJob, 
  editJobForm, 
  editJob,
  deleteJob } = require('../controllers/jobs')

router.route('/new')
  .get(isUserAuth, newJobForm)
  .post(isUserAuth, addJob)

router.get('/:url', getJob)
router.route('/edit/:url')
  .get(isUserAuth, editJobForm)
  .post(isUserAuth, editJob)

router.delete('/delete/:id', isUserAuth, deleteJob)

module.exports = router