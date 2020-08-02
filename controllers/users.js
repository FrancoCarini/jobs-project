const User = require('../models/User')
const passport = require('passport')
const Job = require('../models/Job')

exports.newUserForm = (req, res) => {
  res.render('users/newUser', {
    pageTitle: 'Crea tu cuenta',
    tagline: 'Comienza a publicar trabajos'
  })
}

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.redirect('/users/init-session')
  } catch (error) {
    req.flash('error', error)

    res.render('users/newUser', {
      pageTitle: 'Crea tu cuenta',
      tagline: 'Comienza a publicar trabajos',
      messages: req.flash()
    })
  }
}

exports.initSessionForm = (req, res) => {
  res.render('users/initSession', {
    pageTitle: 'Iniciar Sesion'
  })
}

exports.authUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/init-session',
    failureFlash: true,
    badRequestMessage: 'Both Fields are required'
  })(req, res, next)
}

exports.adminPanel = async (req, res) => {
  const jobs = await Job.find({user: req.user._id})
  res.render('users/adminPanel', {
    pageTitle: 'Users Admin',
    jobs,
    closeSession: true,
    username: req.user.name
  })
}

exports.editUserForm = (req, res) => {
  res.render('users/edit', {
    pageTitle: 'Editar Usuario',
    user: req.user
  })
}

exports.editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  })
  req.flash('correcto', 'El usuario se actualizo')
  res.redirect('/users/administration')
}

exports.closeSession = (req, res) => {
  req.logout()
  res.redirect('/users/init-session')
}