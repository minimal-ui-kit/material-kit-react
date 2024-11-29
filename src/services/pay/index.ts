import PaystackPop from '@paystack/inline-js';
import { fx } from 'src/configs';
import { ApiRoute } from 'src/constants/fxns';
import { errCb } from 'src/utils';
import { ContributeInit } from './pay.dto';

export default class PayService {
  static async init(amount: string, months: string[]) {
    try {
      const res = await fx.call<ContributeInit, { code: string }>(ApiRoute.InitPayment, {
        amount,
        months,
      });
      const popup = new PaystackPop();
      popup.resumeTransaction(res.code as any);
      return popup
    } catch (error) {
      const err = error as Error;
      errCb(err.message);
      return null;
    }
  }
}
