const open = require('open')
const path = require('path')
const spawn = require('child_process').spawn
module.exports = function () {
  const serverFile = path.resolve(__dirname, '../server/index.js')
  const child = spawn('node', [serverFile], {
    env: process.env,
    stdio: 'inherit'
  })
  open('http://localhost:3000')
  child.on('close', function (code) {
    process.exit(code)
  })
}
