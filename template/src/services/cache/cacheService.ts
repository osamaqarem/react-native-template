import AsyncStorage from "@react-native-community/async-storage"

const put = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.warn("CacheService: Failed to put pair " + `[${key}, ${value}]`)
    __DEV__ && console.log(e)
  }
}

const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.warn("CacheService: Failed to get " + key)
    __DEV__ && console.log(e)
  }
}

export const cacheService = {
  put,
  get,
}
