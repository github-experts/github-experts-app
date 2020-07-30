const apiRoot = process.env.REACT_APP_API_ROOT || '';

export default function request(url, opts) {
  const token = localStorage.getItem('id_token');

  if (token) {
    // means we're running on localhost, in production we're using the EasyAuth cookie
    // so no need to pass the authorization header there
    const headers = opts.headers || {};
    headers.Authorization = `Bearer ${token}`;
    opts.headers = headers;
  }

  return fetch(`${apiRoot}/${url}`, opts);
}
