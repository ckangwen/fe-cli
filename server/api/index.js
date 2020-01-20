const express = require('express')
const path = require('path')
const router = express.Router()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(__dirname, '../db.json'))
const db = low(adapter)

router.get('/test', (req, res) => {
  res.json({ msg: 'login works' })
})

router.post('/getRepoInfo', (req, res) => {
  const { category, type, name } = req.body
  let result = null
  if (name === undefined) {
    result = db.get(category).get(type).value()
  } else {
    result = db.get(category).get(type).find({ name }).value()
  }
  return res.json(result)
})

module.exports = router
