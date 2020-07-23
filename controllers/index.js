exports.showIndex = (req, res) => {
  res.render('index', {
    pageTitle: 'devJobs',
    searchBar: true,
    vacancyButton: true,
    tagline: 'Encuentra y publica trabajos para Desarrolladores'
  })
}