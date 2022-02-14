const dayjs = require('dayjs')

function compareIfBefore(start_date, end_date) {
  return dayjs(start_date).isBefore(end_date)
}

module.exports = compareIfBefore
