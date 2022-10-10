const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

async function main() {
  await mongoose.connect(process.env.MONGODB_SHORTENER_URI)
  console.log('mongodb connectde!')
}

main().catch(err => console.log(err))


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`)
})