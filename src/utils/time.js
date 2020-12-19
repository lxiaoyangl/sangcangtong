/**
 * 格式化时间补足两位
 * @param {Number} time 时间
 */
const _formatTime = time => (String(time).length < 2 ? `0${time}` : time)

/**
 * 格式化日期
 * @param {Date} time 时间秒/时间戳/new Date()
 * @param {string} fmt 返回格式 'yyyy-MM-dd HH:mm:ss SSS q'
 */
export const timestampToTime = (time, fmt = 'y-M-d h:m:s') => {
  let _time = time
  if (!time) {
    return time
  }
  if (time instanceof Date) {
    _time = time.getTime()
  }
  _time = parseInt(_time, 10)
  if (String(_time).length === 4) {
    _time = new Date(time).getTime()
  }
  if (String(_time).length === 10) {
    _time *= 1000
  }
  const format = fmt
  const date = new Date(_time)
  const reslut = {
    y: date.getFullYear(),
    Y: date.getFullYear().toString().substr(2),
    M: _formatTime(date.getMonth() + 1),
    d: _formatTime(date.getDate()),
    h: _formatTime(date.getHours()),
    m: _formatTime(date.getMinutes()),
    s: _formatTime(date.getSeconds()),
  }
  return format.replace(/[YyMdhms]/g, v => reslut[v])
}
