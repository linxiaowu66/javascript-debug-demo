import fetch from 'isomorphic-fetch'

export function fetchJSON(url, params) {
  // eslint-disable-next-line no-param-reassign
  params = {
    credentials: 'include',
    ...params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      ...params.headers,
    },
  }
  // eslint-disable-next-line no-param-reassign
  url = `${url}`
  return fetch(url, params)
}

function buildURL(url, data) {
  return url.split('/').map((item) => {
    if (item.indexOf('$') === 0) {
      const key = item.slice(1)
      if (data[key] !== undefined) {
        const value = data[key]
        delete data[key]
        return value
      }
      return item
    }
    return item
  }).join('/')
}
/* eslint-disable */
function serialize(obj, prefix) {
  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}
/* eslint-enable */

function buildParams(obj) {
  if (!obj) {
    return ''
  }
  return serialize(obj)
}
// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = url => query => {
  const params = {
    method: 'POST',
    body: buildParams(query),
  }
  const buildUrl = buildURL(url, query)
  return fetchJSON(buildUrl, params)
}

