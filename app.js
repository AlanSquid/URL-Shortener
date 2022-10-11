const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

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
  const sourceUrl = req.body.url
})

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`)
})