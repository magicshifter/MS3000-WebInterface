export function isString(myVar) {
  return typeof myVar === 'string' || myVar instanceof String
}

export function isFloat(n) {
  return n === +n && n !== (n | 0)
}

export function  isInteger(n) {
  return n === +n && n === (n | 0)
}


