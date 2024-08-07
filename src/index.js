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
  const params = search2JSON(matches[7]);

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
 * @param {string} search
 * @returns {object}
 */
export function search2JSON(search) {
  const queryArr = search.replace(/^\?/, '').split(/&+/);
  let params = {};

  queryArr.forEach(item => {
    //防止value里包含'='误伤
    let index = item.indexOf('=');
    let key = item.substr(0, index);
    let value = item.substring(index + 1);

    if (key) {
      params[key] = decodeURIComponent(value);
    }
  });

  return params;
}

/**
 * @param {object} json
 * @returns {string}
 */
export function json2search(json) {
  const str = [];

  Object.keys(json).map(k => {
    if (!Object.prototype.hasOwnProperty.call(json, k)) {
      return;
    }

    const isNotEmpty = !~[undefined, null, ''].indexOf(json[k]);

    if (isNotEmpty) {
      str.push(`${k}=${encodeURIComponent(typeof json[k] === 'string' ? json[k] : JSON.stringify(json[k]))}`);
    }
  });

  return str.join('&');
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
      const _params = Object.assign({}, _obj.params);

      const search = json2search(_params);

      result += search ? '?' + search : '';
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
