const mongoose = require('mongoose')
const slug = require('slug')
const shortid = require('shortid')

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'El nombre del trabajo es obligatorio',
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    required: 'El lugar es obligatorio'
  },
  salary: {
    type: String,
    default: 0,
    trim: true
  },
  hours: {
    type: String,
    trim: true,
    enum: [
      'Freelance',
      'Medio tiempo',
      'Tiempo completo',
      'Por proyecto'
    ]
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill"
    }
  ],
  applicants: [{
    nombre: String,
    email: String,
    cv: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

JobSchema.pre('save', function(next) {
  const url = slug(this.title)
  this.url = `${url}-${shortid.generate()}`
  next()
})

module.exports = mongoose.model('Job', JobSchema)