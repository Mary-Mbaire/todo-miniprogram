function requestResource({ url, method = 'GET', data = {}, success, fail, complete }) {
  let params = {
    url,
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    dataType: 'json',
    success,
    fail,
    complete,
  };

  if (method !== 'GET' && data) {
    params.data = typeof data === 'string' ? data : JSON.stringify(data);
  }

  my.request(params);
}

module.exports = {
  requestResource
};
