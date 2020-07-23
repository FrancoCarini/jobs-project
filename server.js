const express = require('express')
const dotenv = require('dotenv')
//Load env vars
dotenv.config({path: './config/config.env'})
const mongoose = require('mongoose')
const connectDB = require('./config/db')
connectDB()

const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const exphbs = require('express-handlebars')
const path = require('path')

// Routes
const indexRoutes = require('./routes/index')

const app = express()

// Use Engine View Handlebars
app.engine('handlebars', 
  exphbs({
    defaultLayout: 'layout'
  })
)
app.set('view engine', 'handlebars')

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

// Mount Routes
app.use(indexRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server running')
})