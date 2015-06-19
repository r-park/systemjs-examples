import validation = require('./validation');

var numberRegexp = /^[0-9]+$/;

class ZipCodeValidator implements validation.StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export default ZipCodeValidator;
