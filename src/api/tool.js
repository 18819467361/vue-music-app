import fetchJsonp from 'fetch-jsonp'

function fetchData (url, dataObj, callback) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(dataObj)
  // console.log('on fetch')
  fetchJsonp(url, {
    jsonpCallbackFunction: 'jsonp1' // 定义返回的数据以jsonp1函数包裹
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      callback(json)
    }).catch(function (err) {
      console.log('parseing failed', err)
    })
}

function param (dataObj) {
  let url = ''
  for (let k in dataObj) {
    let value = dataObj[k] !== undefined ? dataObj[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}

export default {
  fetchData
}