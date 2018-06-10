let D = new Date()
let y = D.getFullYear('yyyy')
let m = D.getMonth('mm') + 1
let d = D.getDate('dd')
console.log(new Date('yyyy-m-d'))
console.log(y+'-'+m+'-'+d)

function addZero (num) {
  let str = num.toString().split()
  if (str.length < 2) {
    str.unshift('0')
  }
  return str.join('')
}
console.log(addZero(1))
