const dayjs = require('dayjs')

function addHour(hours) {
  return dayjs().add(hours, 'hour').toDate()
}

module.exports = addHour
