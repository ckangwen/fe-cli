const fs = require('fs')
const path = require('path')
const request = require('request')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(__dirname, '../db.json'))
const db = low(adapter)

const generateContentPath = function ({ category, type, names }) {
  const base = 'https://raw.githubusercontent.com/ckangwen/fe-repo/master/src'
  let arr = [base, category, type, ...names]
  return (fileName) => {
    return arr.concat(fileName).join('/')
  }
}

const everySync = async function (target, callback) {
  for (let [index, item] of Object.entries(target)) {
    if (!await callback.call(target, item, index, target)) return false
  }
  return true
}

const getFileNameFromUrl = function (url) {
  const urlSplit = url.split('/')
  return urlSplit[urlSplit.length - 1]
}

const _downloadFile = function (url, exportPath) {
  request(url, (err, status, body) => {
    if (err) console.log(err)
  }).pipe(fs.createWriteStream(path.resolve(exportPath, getFileNameFromUrl(url))))
}

/**
 * 文件下载本地
 * @param {*} category 导出的物料的类型 { component | template | page}
 * @param {*} name 物料名称 (List)
 * @param {*} exportPath 保存到本地的路径
 */
const downloadFile = function (category, name, exportPath) {
  let type = ['vue', 'react', 'others']
  type.forEach(item => {
    let content = db.get(category).get(item).find({ name }).value()
    if (content) {
      content.downloadUrl.forEach(link => {
        if (new RegExp('(js|vue|ts|jsx|tsx|less|css|scss)$').test(link)) {
          _downloadFile(link, exportPath)
        }
      })
    }
  })
}

module.exports = {
  generateContentPath,
  everySync,
  getFileNameFromUrl,
  _downloadFile,
  downloadFile
}
