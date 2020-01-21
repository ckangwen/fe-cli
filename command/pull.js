const path = require('path')
// const fs = require('fs')
const fse = require('fs-extra')
const { downloadFile } = require('../../server/utils/tools')
module.exports = function pull (category, name, output = './fe') {
  output = path.resolve(process.cwd(), './fe')
  fse.mkdirpSync(output)
  downloadFile(category, name, output)
}
