import AsyncStorage from "@react-native-community/async-storage"

const TOKEN_KEY = "TOKEN_KEY"

const putToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token)
  } catch (e) {
    console.warn("AsyncStore: Failed to put token")
    __DEV__ && console.tron(e)
  }
}

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY)
  } catch (e) {
    console.warn("AsyncStore: Failed to get token")
    __DEV__ && console.tron(e)
  }
}

const put = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.warn("AsyncStore: Failed to put pair " + `[${key}, ${value}]`)
    __DEV__ && console.tron(e)
  }
}

const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.warn("AsyncStore: Failed to get " + key)
    __DEV__ && console.tron(e)
  }
}

export const AsyncStorageService = {
  putToken,
  getToken,
  put,
  get,
}
