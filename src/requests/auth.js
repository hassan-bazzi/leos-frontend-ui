import ApiRequest from './api-request';

export function loginRequest(username, password) {
  return ApiRequest({
    path: '/v1/deals/login',
    method: 'POST',
    data: JSON.stringify({
      username: username,
      password: password,
    })
  });
}

export function getUserRequest() {
  return ApiRequest({
    path: '/v1/deals/me',
    method: 'GET',
  })
}
