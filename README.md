# `js-utils-url`

> 仅依赖JS Engine运行环境的URL 解析、修改/追回参数hash等方法集

## Usage
1. 添加依赖 `yarn`

```
yarn add js-utils-url
```

2. 应用
    
```js
import { 
  parse, 
  setSearch
} from 'js-utils-url';

const r = parse('/pages/foo/index?&a=1&b=2&c=3#hash');
//return
r = {
  "href": "/pages/foo/index?&a=1&b=2&c=3#hash",
  "origin": "",
  "pathname": "/pages/foo/index",
  "search": "?&a=1&b=2&c=3",
  "hash": "#hash",
  "params": {
    "a": "1",
    "b": "2",
    "c": "3"
  }
}


parse('https://m.foo.com/foo/index.html?&a=1&b=2&c=3#hash');
//return 
{
  "href": "https://m.foo.com/foo/index.html?&a=1&b=2&c=3#hash",
  "origin": "https://m.foo.com",
  "protocol": "https:",
  "host": "m.foo.com",
  "hostname": "m.foo.com",
  "pathname": "/foo/index.html",
  "port": undefined,
  "search": "?&a=1&b=2&c=3",
  "hash": "#hash",
  "params": {
    "a": "1",
    "b": "2",
    "c": "3"
  }
}

//修改或追加参数
setSearch('/pages/foo/index?&a=1&b=2&c=3#hash', {a:7, e:9}, 'newHash');
//return 
"/pages/foo/index?a=7&b=2&c=3&e=9#newHash"


setSearch('https://m.foo.com/pages/foo/index?&a=1&b=2&c=3#hash', {a:7, e:9}, 'newHash');
//return
"https://m.foo.com/pages/foo/index?a=7&b=2&c=3&e=9#newHash"
```