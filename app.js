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
  const origin = req.headers.host
  URL.findOne({ sourceURL })
    .lean()
    // 沒找到就建立一個新的資料
    .then(data => data ? data : URL.create({ sourceURL, shortURL: shorten(5) }))
    .then(data => res.render('index', { sourceURL, shortURL: data.shortURL, origin }))
    .catch(err => console.log(err))
})

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  URL.findOne({ shortURL })
    .lean()
    .then(data => {
      // 若沒找到資料，渲染error.hbs頁面
      if (!data) {
        res.render('error', { errorURL: `http://${req.headers.host}/${shortURL}` })
      } else {
        // 找到資料導向原URL
        res.redirect(data.sourceURL)
      }
    })
    .catch(err => console.log(err))
})

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`)
})
