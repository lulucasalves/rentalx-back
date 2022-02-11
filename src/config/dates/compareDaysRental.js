const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

function compareDays(startDate, expectDate) {
  dayjs.extend(utc)

  const start_date = dayjs(startDate).utc().local().format()
  const expect_date = dayjs(expectDate).utc().local().format()
  const newDate = dayjs(new Date()).utc().local().format()

  const compareBefore = dayjs(newDate).diff(start_date, 'hours') / 24
  const compareAfter = dayjs(expect_date).diff(start_date, 'hours') / 24

  if (compareBefore < compareAfter) {
    if (compareBefore < 1) {
      return 1
    }

    return parseInt(compareBefore)
  } else {
    if (compareAfter < 1) {
      return 1
    }

    return parseInt(compareAfter)
  }
}

module.exports = compareDays
