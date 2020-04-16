'use strict';
import 'console-log-h5';

import { 
  parse, 
  setSearch
} from 'js-utils-url';

document.addEventListener('click', e => {
  const action = e.target.getAttribute('data-action');

  switch (action) {
    case 'parse':
      console.log(parse('/pages/foo/index?&a=1&b=2&c=3#hash'));
      break;
    default:
      console.log(setSearch('/pages/foo/index?&a=1&b=2&c=3#hash', {a: 7, e: 9}, 'newHash'));
      break;
  }

}, false);