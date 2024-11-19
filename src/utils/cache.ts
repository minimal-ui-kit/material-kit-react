import { payloadDeHash, payloadHash } from './encrypt';

export enum CacheKeys {
  Token = 'my.auth.id.t',
}

export class Cache {
  static set<T>(id: CacheKeys, data: T) {
    return localStorage.setItem(id as any, this.parse<T>(data));
  }

  static get<T>(id: CacheKeys) {
    const hash = localStorage.getItem(id);
    if (!hash) return null;
    return this.unparse(hash) as T;
  }

  private static parse<T = unknown>(data: T) {
    if (!data) return '';
    const payloadString = JSON.stringify(data);
    return payloadHash(payloadString);
  }

  private static unparse<T>(hash: string) {
    if (!hash) return null;
    const payloadString = payloadDeHash(hash);
    console.log('PAYLOAD STRING', payloadString);
    return JSON.parse(payloadString);
  }
}
