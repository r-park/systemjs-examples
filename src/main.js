import config from './config.js';
import token from './token.js';

export default function() {
  token.set(config.token);
  console.log('token:', token);
}
