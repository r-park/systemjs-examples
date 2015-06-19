import validation = require('./validation');

var lettersRegexp = /^[A-Za-z]+$/;

class LettersOnlyValidator implements validation.StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

export default LettersOnlyValidator;
