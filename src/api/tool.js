import fetchJsonp from 'fetch-jsonp'

function fetchData1 (url, dataObj, callback) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(dataObj)
  // console.log('on fetch')
  fetchJsonp(url, {
    jsonpCallback: 'jsonpCallback' // 定义返回的数据以jsonp1函数包裹
    // jsonpCallback: 'callback' // 定c义返回的数据以jsonp1函数包裹
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      callback(json)
    }).catch(function (err) {
      console.log('parseing failed', err)
    })
}
function fetchData2 (url, dataObj, name, index, callback) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(dataObj)
  fetchJsonp(url, {
    jsonpCallback: 'callback' // 定c义返回的数据以jsonp1函数包裹
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      callback(json, name, index)
    }).catch(function (err) {
      console.log('parseing failed', err)
    })
}
function fetchData3 (url, dataObj, callback, item) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(dataObj)
  // console.log('on fetch')
  fetchJsonp(url, {
    jsonpCallback: 'callback' // 定义返回的数据以jsonp1函数包裹
    // jsonpCallback: 'callback' // 定c义返回的数据以jsonp1函数包裹
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      callback(json, item)
    }).catch(function (err) {
      console.log('parseing failed', err)
    })
}
function fetchData4 (url, dataObj) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(dataObj)
  // console.log('on fetch')
  return fetchJsonp(url, {
    jsonpCallback: 'jsonpCallback' // 定义返回的数据以jsonp1函数包裹
    // jsonpCallback: 'callback' // 定c义返回的数据以jsonp1函数包裹
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      // console.log(json,'fetchdata')
      return Promise.resolve(json)
      // callback(json)
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
  fetchData1,
  fetchData2,
  fetchData3,
  fetchData4
}
