const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const shorten = require('./utility/shorten.js')
const URL = require('./models/URL.js')

// connect MongoDB
async function main() {
  await mongoose.connect(process.env.MONGODB_SHORTENER_URI)
  console.log('mongodb connected!')
}

main().catch(err => console.log(err))


const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const sourceURL = req.body.sourceURL
  URL.findOne({ sourceURL })
    .lean()
    .then(data => data ? data : URL.create({ sourceURL, shorten: shorten(5) }))
    .then(data => res.render('index', { sourceURL, shorten: data.shorten }))
    .catch(err => console.log(err))
})

// URL_PAIR.create({ sourceURL, shortURL })
// console.log(sourceURL)
// console.log(shortURL)

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`)
})
