import crypto from 'crypto-js';

const KEY = '1NF1U3N51NG11V35';

export function hash(plainText: string) {
  return crypto.SHA256(KEY + plainText).toString(crypto.enc.Hex);
}

export function payloadHash(plainText: string) {
  return crypto.AES.encrypt(plainText, KEY).toString();
}

export function payloadDeHash(hashVal: string) {
  return crypto.AES.decrypt(hashVal, KEY).toString(crypto.enc.Utf8);
}
