function prom () {
  let test = new Promise((resolve, reject) => {
    setTimeout(() => {
      let num = Math.floor(Math.random() * 10 + 1)
      if(num > 2){
        resolve(num)
      } else {
        reject ('小于2*1')
      }
    }, 2000)
  }).then((res) => {
    console.log(res,'大于2*1')
    let test2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        let num = Math.floor(Math.random() * 10 + 1)
        if(num > 2){
          resolve(num)
        } else {
          reject ('小于2*2')
        }
      }, 2000)
    }).then((res) => {
      console.log(res,'大于2*2')
    }).catch((err) => {
      console.log(err,'错误消息')
    })
  }).catch((err) => {
    console.log(err,'错误消息')
  })
  console.log('wiating promise')
}

prom()
