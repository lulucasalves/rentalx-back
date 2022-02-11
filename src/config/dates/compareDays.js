const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

function compareDays(expectDate) {
  dayjs.extend(utc)

  const start_date = dayjs(new Date()).utc().local().format()
  const expect_date = dayjs(expectDate).utc().local().format()

  const compareAfter = dayjs(start_date).diff(expect_date, 'hours') / 24


  if (compareAfter < 0) {
    return 0
  }

  return parseInt(compareAfter)
}

module.exports = compareDays
