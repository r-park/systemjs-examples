import validation = require('./validation');
import zipValidator from './zip-code-validator';
import lettersValidator from './letters-only-validator';

function test() {
  // Some samples to try
  var strings = ['Hello', '98052', '101'];

  // Validators to use
  var validators:{ [s: string]: validation.StringValidator; } = {};

  validators['ZIP code'] = new zipValidator();
  validators['Letters only'] = new lettersValidator();

  // Show whether each string passed each validator
  strings.forEach(s => {
    for (var name in validators) {
      console.log('"' + s + '" ' + (validators[name].isAcceptable(s) ? ' matches ' : ' does not match ') + name);
    }
  });
}

export default test;
