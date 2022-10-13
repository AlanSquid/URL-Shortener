const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const PORT = 3000

// connect MongoDB
require('./config/mongoose')

const routes = require('./routes')
const app = express()

// setting template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)


// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})
