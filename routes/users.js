const express = require('express')
const router = express.Router()

const { isUserAuth } = require('../middleware/isAuth')

const { newUserForm, 
  addUser, 
  initSessionForm,
  authUser,
  adminPanel,
  editUserForm,
  editUser,
  closeSession } = require('../controllers/users')

router.route('/new')
  .get(isUserAuth, newUserForm)
  .post(isUserAuth, addUser)

router.route('/init-session')
  .get(initSessionForm)
  .post(authUser)

  router.route('/edit')
  .get(isUserAuth, editUserForm)
  .post(isUserAuth, editUser)

router.get('/close-session', isUserAuth, closeSession)

router.get('/administration', isUserAuth, adminPanel)

module.exports = router