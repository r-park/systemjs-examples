'use strict';

import zipValidator from './zip-code-validator';
import lettersValidator from './letters-only-validator';

export default function test() {
  // Some samples to try
  var strings = ['Hello', '98052', '101'];

  // Validators to use
  var validators = {};

  validators['ZIP code'] = new zipValidator();
  validators['Letters only'] = new lettersValidator();

  // Show whether each string passed each validator
  strings.forEach(function(str){
    for (var name in validators) {
      console.log('"' + str + '" ' + (validators[name].isAcceptable(str) ? ' matches ' : ' does not match ') + name);
    }
  });
}
