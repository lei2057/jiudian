export default {
  httpTypeImg (data) {
    let strImg = []
    data.forEach(e => {
      if (e.substr(0, 4) !== 'http') {
        strImg.push('http://' + e)
      } else {
        strImg.push(e)
      }
    })
    return strImg
  },
  Imgs (data) {
    console.log(data)
    let strImg
    if (data.substr(0, 4) !== 'http') {
      strImg = 'http://' + data
    } else {
      strImg = data
    }
    console.log(strImg)
    return strImg
  }
}
