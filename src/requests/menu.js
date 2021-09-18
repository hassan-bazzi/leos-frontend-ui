import ApiRequest from './api-request';

export function getMenuRequest() {
  return ApiRequest({
    path: `/menu`,
    method: 'GET'
  });
}

export default getMenuRequest;