const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'El nombre del skill es obligatorio',
    trim: true,
    unique: true
  },
  active: Boolean,
  order: Number
})

module.exports = mongoose.model('Skill', SkillSchema)