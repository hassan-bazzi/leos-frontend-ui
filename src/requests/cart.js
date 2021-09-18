import ApiRequest from './api-request';

export function getCartRequest() {
  return ApiRequest({
    path: `/cart`,
    method: 'GET'
  });
}

export function clearCartRequest() {
  return ApiRequest({
    path: `/cart/clear`,
    method: 'GET'
  });
}

export function updateCartRequest(data) {
  return ApiRequest({
    path: `/cart`,
    method: 'POST',
    data: JSON.stringify(data)
  });
}

export function paymentRequest(data) {
  return ApiRequest({
    path: '/cart/pay',
    method: 'POST',
    data: JSON.stringify(data)
  })
}

export function getStripeKeysRequest() {
  return ApiRequest({
    path: '/cart/stripe-keys',
    method: 'GET'
  })
}

export default getCartRequest;