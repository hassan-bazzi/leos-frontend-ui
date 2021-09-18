export function getStorageItem(key) {
  return localStorage.getItem(key);
}

export function putStorageItem(key, value) {
  return localStorage.setItem(key, value);
}

export function deleteStorageItem(key) {
  return localStorage.removeItem(key);
}

export function putToken(token) {
  return putStorageItem('token', token);
}

export function deleteToken() {
  return deleteStorageItem('token');
}

export function getToken() {
  return getStorageItem('token');
}
