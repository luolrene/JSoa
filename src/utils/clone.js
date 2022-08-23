export const copy = (obj) => {
  // 先判断拷贝目标是对象还是数组，用instanceof判断原型是Array还是Object
  let res = obj instanceof Array ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    res[key] = typeof value === 'object' ? copy(value) : value;
  }
  return res
  // return JSON.parse(JSON.stringify(obj));
}
