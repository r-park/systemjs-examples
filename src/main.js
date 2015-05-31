import config from './config';
import token from './token';

export default function() {
  token.set(config.token);
  console.log('token:', token);
}
