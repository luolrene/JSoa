// 格林威治转正常时间转换
export const GMTToStr = (time) => {
  let date = new Date(time)
  let Str = date.getFullYear() + '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
    date.getDate().toString().padStart(2, '0')
  return Str
}
