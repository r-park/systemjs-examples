'use strict';

import lettersRegexp from './letters-regexp';

export default function LettersOnlyValidator() {}

LettersOnlyValidator.prototype.isAcceptable = function(str) {
  return lettersRegexp.test(str);
};
