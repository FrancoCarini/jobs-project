exports.newJobForm = (req, res) => {
  res.render('jobs/newJob', {
    pageTitle: 'Nuevo Trabajo',
    tagline: 'Completa el formulario y publica el trabajo'
  })
}