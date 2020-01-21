const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const api = require('./api')

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.resolve(__dirname, '../dist'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
  next()
})

app.get('/', (req, res) => {
  // res.type('html')
  res.render('index.html')
})

app.use('/api', api)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
