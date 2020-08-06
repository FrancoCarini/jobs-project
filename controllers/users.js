const User = require('../models/User')
const passport = require('passport')
const Job = require('../models/Job')
const path = require('path')

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
  // There is an image
  if (req.files) {
    const file = req.files.image

    // Validation
    //Check if is an image
    if (!file.mimetype.startsWith('image')) {
      req.flash('error', 'El archivo no es una imagen')
      return res.redirect('back')
    }

    const fileExt = process.env.FILE_TYPES.split(',');
    // Check extension
    if (!fileExt.includes(file.mimetype)) {
      req.flash('error', 'El archivo no tiene una extension permitida')
      return res.redirect('back')
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      req.flash('error', 'El archivo es demasiado pesado')
      return res.redirect('back')
    }

    //Create custom file name
    file.name = `${req.user._id}_${path.parse(file.name).ext}`
    req.body.image = file.name

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, err => {
      if (err) {
        req.flash('error', 'Error subiendo archivo')
        return res.redirect('back')
      }
    })
  }

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