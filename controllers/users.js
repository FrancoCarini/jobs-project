exports.newUserForm = (req, res) => {
  res.render('users/newUser', {
    pageTitle: 'Crea tu cuenta',
    tagline: 'Comienza a publicar trabajos'
  })
}