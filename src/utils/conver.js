function conver (obj, ob = {}, path = '') {
  if (path !== '' && typeof obj !== 'object') {
    ob[path] = obj
    return ob[path]
  }
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          conver(item, ob, getRealKey(path, `${key}[${index}]`))
        })
      } else {
        conver(obj[key], ob, getRealKey(path, key))
      }
    } else {
      ob[getRealKey(path, key)] = obj[key]
    }
  } return ob
}
function getRealKey (parent, children) {
  return parent === '' ? children : `${parent}[${children}]`
}
export default function (items) {
  const obj = {}
  conver(items, obj, '')
  return obj
}
