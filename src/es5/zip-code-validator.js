'use strict';

import zipCodeRegexp from './zip-code-regexp';

export default function ZipCodeValidator() {}

ZipCodeValidator.prototype.isAcceptable = function(str) {
  return str.length === 5 && zipCodeRegexp.test(str);
};
