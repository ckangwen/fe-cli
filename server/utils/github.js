const path = require('path')
const github = require('octonode')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(__dirname, '../db.json'))
const db = low(adapter)

const { repoUrl } = require('../config')
const token = require('../../token')
const { generateContentPath, everySync } = require('./tools')

const client = github.client(token)

db.defaults({
  shas: {},
  dirNameToUrlMap: {},
  components: {
    vue: [],
    react: [],
    others: []
  },
  pages: {
    vue: [],
    react: []
  },
  templates: {
    vue: [],
    react: [],
    others: []
  },
  functions: []
}).write()

function fetchGithubAPIPromisify (url) {
  return new Promise((resolve, reject) => {
    client.get(url, {}, (err, status, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

async function getRepoFileStructure (url, dirs = []) {
  let b = await fetchGithubAPIPromisify(url)
  for (let info of b) {
    if (info.type === 'dir') {
      const { name, path, sha, url } = info
      db.get('dirNameToUrlMap').set(name, url).write()
      dirs.push({ name, path, sha })
      try {
        await getRepoFileStructure(info.url, dirs)
      } catch (error) {
        console.log('err')
      }
    } else {
      let fileArr = info.path.split('/')
      if (fileArr.length > 3) {
        let name = fileArr[fileArr.length - 2]
        let [tar] = dirs.filter(item => item.name === name)
        if (!tar.downloadUrl) {
          tar.downloadUrl = []
        }
        tar.downloadUrl.push(info.download_url)
      }
    }
  }
  return dirs
}

function resolveRepoFileStructure (dirObj) {
  return dirObj.map(item => {
    let [ , category, type, ...names ] = item.path.split('/')
    return {
      category,
      type,
      names,
      downloadUrl: item.downloadUrl
    }
  }).filter(item => {
    return item.category && item.type && item.names.length > 0
  })
}

function init (url = repoUrl) {
  getRepoFileStructure(url)
    .then(res => {
      res.forEach(item => {
      // shas[item.name] = item.sha
        db.get('shas').set(item.name, item.sha).write()
      })
      let result = resolveRepoFileStructure(res)
      // 获取snapshot.png和description

      // 清除之前的数据
      cleanDBData()
      result.forEach(item => {
        const { names, type, category, downloadUrl } = item
        let snapshot = generateContentPath(item)('snapshot.png')

        // 写入新的数据
        db.get(category)
          .get(type)
          .push({
            name: names.length > 1 ? names.join('.') : names[0],
            snapshot,
            downloadUrl
          })
          .write()
      })
    })
}

/**
 * TODO 如果仓库文件夹的sha未改变，则不需要请求该url
 * 判断仓库是否更新
 * 如果仓库变化，则返回变化的仓库的url
*/
const hasUpdate = async () => {
  let dirNameToUrlMap = db.get('dirNameToUrlMap').value()
  let keys = Object.keys(db.get('shas').value())
  let changedFolderUrl = null
  await everySync(keys, async (item) => {
    let [info] = await fetchGithubAPIPromisify(dirNameToUrlMap[item])
    if (info.sha !== dirNameToUrlMap[item].sha) {
      changedFolderUrl = dirNameToUrlMap[item]
      return false
    }
    return true
  })
  return changedFolderUrl
}

module.exports = {
  init,
  hasUpdate,
  getRepoFileStructure,
  fetchGithubAPIPromisify
}

function cleanDBData () {
  let categories = ['components', 'templates', 'pages']
  let types = ['vue', 'react', 'others']
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (db.get(categories[i]).get(types[j]).value()) {
        db.get(categories[i]).set(types[j], []).write()
      }
    }
  }
}
