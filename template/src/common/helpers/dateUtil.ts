/**
 * takes in unix time (number) and returns date
 * e.g. 1568193605000 -> yyyy/mm/dd
 */
const getDateFromEpochMillis = (unixTime: number) => {
  const date = new Date(unixTime)

  const year = date.getFullYear() + ""
  const month = date.getMonth() + 1
  const day = date.getDate()

  let monthWithLeadingZero

  if (month < 10) {
    monthWithLeadingZero = "0" + month
  } else {
    monthWithLeadingZero = month + ""
  }

  let dayWithLeadingZero

  if (day < 10) {
    dayWithLeadingZero = "0" + day
  } else {
    dayWithLeadingZero = day + ""
  }

  return year + "-" + monthWithLeadingZero + "-" + dayWithLeadingZero
}

/**
 * takes in unix time (number) and returns local time
 * e.g. 1568193605000 -> "17:20:01"
 */
const getTimeFromEpochMillis = (unixTime: number) => {
  const date = new Date(unixTime)

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  let hoursWithLeadingZero

  if (hours < 10) {
    hoursWithLeadingZero = "0" + hours
  } else {
    hoursWithLeadingZero = hours
  }

  let secondsWithLeadingZero

  if (seconds < 10) {
    secondsWithLeadingZero = "0" + seconds
  } else {
    secondsWithLeadingZero = seconds
  }

  if (minutes < 10) {
    return (
      hoursWithLeadingZero + ":" + "0" + minutes + ":" + secondsWithLeadingZero
    )
  } else {
    return hoursWithLeadingZero + ":" + minutes + ":" + secondsWithLeadingZero
  }
}

export const dateUtil = {
  getDateFromEpochMillis,
  getTimeFromEpochMillis,
}
