const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
//Load env vars
dotenv.config({path: './config/config.env'})
const mongoose = require('mongoose')
const connectDB = require('./config/db')
connectDB()

const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('./config/passport')
const MongoStore = require('connect-mongo')(session)
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const fileupload = require('express-fileupload')

// Routes
const indexRoutes = require('./routes/index')
const jobsRoutes = require('./routes/jobs')
const usersRoutes = require('./routes/users')

const app = express()

// Use Express Layouts
app.use(expressLayouts);

// Enable EJS
app.set('view engine', 'ejs');

// Set Layout
app.set('layout', 'layouts/layout');

// File Upload
app.use(fileupload())

// Body Parser
app.use(express.urlencoded({ extended: false }))

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser())

// Session config
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

// Mount Routes
app.use(indexRoutes)
app.use('/jobs', jobsRoutes)
app.use('/users', usersRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server running')
})