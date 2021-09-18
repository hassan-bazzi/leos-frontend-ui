import { getToken, putToken, deleteToken } from '../util/storage';

const API_URL = process.env.REACT_APP_API_ENDPOINT

function refreshToken() {
  const token = getToken();
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      'referrerPolicy': 'origin'
    }
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${API_URL}/v1/deals/refresh`, options)
    .then((resp) => {
      return resp.text()
    }).then((resp) => {
      if (resp.length !== 0) {
        const respToken = JSON.parse(resp);
        if ('token' in respToken) {
          putToken(respToken.token)
        }
      } else {
        deleteToken();
      }
    });
}

export default function ApiRequest({ path, method, data, formData }) {
  const token = getToken();

  const options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'referrerPolicy': 'origin',
    },
    redirect: 'follow',
  }

  if (token) {
    options.headers.Authorization = 'Bearer ' + token;
  }

  if (method !== 'GET') {
    options.body = {}

    if (formData) {
      options.body = formData;
    } else if (data) {
      options.body = data;
    }
  }

  if (data && !formData) {
    options.headers['Content-Type'] = 'application/json';
  }

  return fetch(`${API_URL}${path}`, options).then((resp) => {
    let response = resp;

    if (response.status === 401 && token) {
      refreshToken()
      // try again
      fetch(`${API_URL}${path}`, options).then((refreshedResp) => {response = refreshedResp})
    }

    return response.text()
  }).then((json) => {
    if (json.length === 0) {
      return {}
    }

    return JSON.parse(json);
  });
}
