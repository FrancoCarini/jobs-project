const Job = require('../models/Job');
const Skill = require('../models/Skill')

exports.newJobForm = async (req, res) => {
  skills = await Skill.find({active: true}).sort({order: 1})

  res.render('jobs/newJob', {
    pageTitle: 'Nuevo Trabajo',
    tagline: 'Completa el formulario y publica el trabajo',
    skills
  })
}

exports.addJob = async (req, res) => {
  const job = new Job(req.body)
  job.title = req.sanitize(req.body.title)
  job.location = req.sanitize(req.body.location)
  job.description = req.sanitize(req.body.description)

  // User Save
  job.user = req.user._id

  // Required Skills 
  job.skills = req.body.skills.split(',')
  const newJob = await job.save()
  res.redirect(`/jobs/${newJob.url}`)
}

exports.getJob = async (req, res, next) => {
  const job = await Job.findOne({url: req.params.url})
    .populate('skills');

  if (!job) return next()

  res.render('jobs/job', {
    job,
    pageTitle: job.title,
    searchBar: true
  })
}

exports.editJobForm = async (req, res, next) => {
  const job = await Job.findOne({url: req.params.url})
    .populate('skills');

  // Check if the job was created by the same user
  if (job.user.toString() !== req.user.id) {
    req.flash('error', 'El trabajo a editar no fue creado por vos. No podes editarlo.')
    return res.redirect(`/users/administration`)
  }

  if (!job) return next()

  // Get all skills
  const allSkills = await Skill.find({active: true})

  res.render('jobs/editJob', {
    job,
    allSkills,
    pageTitle: `Editar - ${job.title}`,
    searchBar: true
  })
}

exports.editJob = async (req, res, next) => {
  const updatedJob = req.body
  updatedJob.skills = req.body.skills.split(',')

  const job = await Job.findOneAndUpdate({url: req.params.url}, updatedJob, {
    new: true,
    runValidators: true
  })
  res.redirect(`/jobs/${job.url}`)
}