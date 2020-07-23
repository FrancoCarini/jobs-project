const express = require('express')
const dotenv = require('dotenv')
//Load env vars
dotenv.config({path: './config/config.env'})
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

// Mount Routes
app.use(indexRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server running')
})