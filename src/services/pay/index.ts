import PaystackPop from '@paystack/inline-js';

import { fx } from 'src/configs';
import { errCb } from 'src/utils';
import { ApiRoute } from 'src/constants/fxns';

import type { ContributeInit } from './pay.dto';

export default class PayService {
  static async init(amount: number, months: string[]) {
    try {
      const res = await fx.call<ContributeInit, { code: string }>(ApiRoute.InitPayment, {
        amount,
        months,
        callbackUrl: window.location.href,
      });
      console.log('RES', res.code);
      const popup = new PaystackPop();
      popup.resumeTransaction(res.code as any);
      return popup;
    } catch (error) {
      const err = error as Error;
      errCb(err.message);
      return null;
    }
  }

  static async resume(code: string) {
    try {
      console.log('Sume', code);
      const popup = new PaystackPop();
      popup.resumeTransaction(code as any);
      return popup;
    } catch (error) {
      const err = error as Error;
      errCb(err.message);
      return null;
    }
  }
}
