import axios from '@/utils/request'
const qs = require('qs')

export function test () {
  return axios.request({
    url: 'test',
    method: 'get'
  })
}

export function getRepoInfo (data) {
  return axios.request({
    url: 'getRepoInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}
