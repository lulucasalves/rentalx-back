const getCurrentDate = () => {
  function plusZero(number) {
    if (number <= 9) return '0' + number
    else return number
  }

  const currentDate = new Date()
  const newDate =
    plusZero(currentDate.getFullYear()) +
    '-' +
    plusZero(currentDate.getMonth() + 1).toString() +
    '-' +
    currentDate.getDate().toString()

  return newDate
}

module.exports = getCurrentDate
