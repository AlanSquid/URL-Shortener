const express = require('express')
const router = express.Router()
const shorten = require('../../utility/shorten')
const URL = require('../../models/URL')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const sourceURL = req.body.sourceURL
  const origin = req.headers.host
  URL.findOne({ sourceURL })
    .lean()
    // 沒找到就建立一個新的資料
    .then(data => data ? data : URL.create({ sourceURL, shortURL: shorten(5) }))
    .then(data => res.render('index', { sourceURL, shortURL: data.shortURL, origin }))
    .catch(err => console.log(err))
})

router.get('/:shortURL', (req, res) => {
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

module.exports = router