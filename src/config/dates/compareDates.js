const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

function compareDate(finalDate) {
  dayjs.extend(utc)

  const expectedReturnDate = dayjs(finalDate).utc().local().format()
  const dateNow = dayjs().utc().local().format()

  const compare = dayjs(expectedReturnDate).diff(dateNow, 'hours') < 24

  return compare
}

module.exports = compareDate
