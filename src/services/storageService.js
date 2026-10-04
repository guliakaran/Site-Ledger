import AsyncStorage from '@react-native-async-storage/async-storage';

async function setItem(key, value) {
  await AsyncStorage.setItem(key, value == null ? '' : String(value));
}

async function getItem(key) {
  return AsyncStorage.getItem(key);
}

async function removeItem(key) {
  await AsyncStorage.removeItem(key);
}

async function clear() {
  await AsyncStorage.clear();
}

async function setJSON(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

async function getJSON(key, fallback = null) {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null || raw === '') {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

export const storageService = {
  setItem,
  getItem,
  removeItem,
  clear,
  setJSON,
  getJSON,
};
