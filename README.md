# `js-utils-url`

> 仅依赖JS Engine运行环境的URL 解析、修改/追回参数hash等方法集

## Usage
1. 添加依赖

```
$ yarn add js-utils-url
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

## Dev
1. 默认使用`yarn`安装npm包，若无请先安装：`$ npm i -g yarn`
2. 初始化环境：`npm run init`
3. 启动开发服务：`$ npm run dev`
  - 自动打开浏览器：`$ npm run dev:open`
4. 构建：
  - 默认构建cjs与es6 module：`$ npm run build`
  - 若只构建umd：`$ npm run build:umd`
    - 同时，需要手动修改`package.json` main字段指向`dist/index.umd.js`
  - 若全部构建：`$ npm run build:all`
5. 要使用命令一步完成git push提交：`$ npm run push -- commit-message`
  - `commit-message`：为git commit提交时的message，自行输入
  - 如：`$ npm run push -- "feat(scope): add yy"`
  - **message格式参照 `commitlint.config.js` 规范提交**
6. 提交git并发布npm包：`npm run pub -- commit-message`
  - 指定版本位(patch|minor|major)，默认为patch，自动+1：`npm run pub -- commit-message -v minor`