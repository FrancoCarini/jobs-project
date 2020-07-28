const Job = require('../models/Job')

exports.showIndex = async (req, res) => {
  const jobs = await Job.find()

  console.log(jobs)
  if (!jobs) return next()

  res.render('index', {
    pageTitle: 'devJobs',
    searchBar: true,
    vacancyButton: true,
    tagline: 'Encuentra y publica trabajos para Desarrolladores',
    jobs: jobs
  })
}