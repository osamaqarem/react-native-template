// Useful for multi-part form submissions.
const getFormUrlEncoded = (jsonBody: any) => {
  const formBody: any = []

  for (const key in jsonBody) {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(jsonBody[key])
    formBody.push(encodedKey + "=" + encodedValue)
  }
  return formBody.join("&")
}

export const networkUtil = {
  getFormUrlEncoded
}
