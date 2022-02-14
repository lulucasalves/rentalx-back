const dayjs = require('dayjs')

function addDays(days) {
  return dayjs().add(days, 'days').toDate()
}

module.exports = addDays
