const express = require('express')
const config = require('./config/index')
const axios = require('axios')

//后端代理
const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)
//后端代理



app.get('/api/fetchDiscList',function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url,{
    headers:{
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/fetchDiscSong',function (req, res) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url,{
    headers:{
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if(typeof ret === 'string'){
      let reg = /^\w+\(({.*})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret =JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})
app.get('/api/lyric', function (req, res) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url,{
    headers:{
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret =response.data
    if(typeof ret ==='string') {
      let reg = /^\w+\(({[^()]+})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret =JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use(express.static('./dist'))

const port = process.env.PORT || config.build.port
module.exports = app.listen(port, function (err) {
  if(err) {
    console.log(err)
    return
  }
  console.log(('listening at http://localhost:' + port + '\n'))
})
