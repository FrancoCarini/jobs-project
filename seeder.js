const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//Load env vars
dotenv.config({path: './config/config.env'})

//Load Models
const Skill = require('./models/Skill')

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

//Read JSON files
const skills = JSON.parse(fs.readFileSync(`${__dirname}/_data/skills.json`), 'utf-8')

//Import into DB
const createSkills = async () => {
  try {
    await Skill.create(skills)
    console.log('Skills imported ...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

createSkills()