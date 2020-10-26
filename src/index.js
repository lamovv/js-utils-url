export const v = '__VERSION__';

/**
 * @typedef {object} Url
 * @property {string} href - 源url
 * @property {string} origin
 * @property {string} protocol
 * @property {string} host
 * @property {string} hostname
 * @property {number} port
 * @property {string} pathname
 * @property {string} search
 * @property {string} hash
 * @property {object} params
 */

/**
 * @param {string} url - URL
 * @returns {Url}
 */
export function parse(url = '') {
  //protocol,hostname,port,pathname,search,hash
  const REG = /^((https?:)?(?:\/{2})?(([^:/]+?\.[^:/?]+)(?::(\d+))?)?)([^?#]*)([^#]*)(#.*)?/i;

  const matches = url.match(REG);
  const queryArr = matches[7].replace(/^\?/, '').split(/&+/);
  let params;

  queryArr.forEach(item => {
    //防止value里包含'='误伤
    let index = item.indexOf('=');
    let key = item.substr(0, index);
    let value = item.substring(index + 1);

    if (key) {
      if (!params) {
        params = {};
      }
      params[key] = decodeURIComponent(value);
    }
  });

  return {
    href: matches[0],
    origin: matches[1],
    protocol: matches[2],
    host: matches[3],
    hostname: matches[4],
    port: matches[5],
    pathname: matches[6],
    search: matches[7],
    hash: matches[8],
    params
  };
}

/**
 * @param {object} obj
 * @returns {string|boolean}
 */
export function object2search(obj) {
  const _obj = Object.assign({}, obj, { '//': '//' });
  const keys = ['protocol', '//', 'host', 'pathname', 'params', 'hash'];

  let result = '';
  keys.forEach(key => {
    //特殊处理参数
    if (key === 'params' && _obj.params) {
      let parArr = [];
      const _params = Object.assign({}, _obj.params);

      for (var k in _params) {
        if (!Object.prototype.hasOwnProperty.call(_params, k)) {
          continue;
        }
        parArr.push(k + '=' + encodeURIComponent(_params[k]));
      }
      result += '?' + parArr.join('&');
    } else {
      if (!obj.hostname && key === '//') {
        return false;
      }
      result += _obj[key] || '';
    }
  });

  return result;
}
/**
 * @param {string} url
 * @param {object} params
 * @param {string} newHash
 * @returns {string}
 */
export function setSearch(url, params, newHash) {
  if (!url) {
    return '';
  }

  let result = parse(url);
  result.params = Object.assign(result.params || {}, params);

  if (newHash) {
    result.hash = (/^#/.test(newHash) ? '' : '#') + newHash;
  }

  return object2search(result);
}

/**
 * @param {string} search
 * @returns {object}
 */
export function search2JSON(search) {
  const queryArr = search.replace(/^\?/, '').split(/&+/);
  let params;

  queryArr.forEach(item => {
    //防止value里包含'='误伤
    let index = item.indexOf('=');
    let key = item.substr(0, index);
    let value = item.substring(index + 1);

    if (key) {
      if (!params) {
        params = {};
      }
      params[key] = decodeURIComponent(value);
    }
  });

  return params;
}
