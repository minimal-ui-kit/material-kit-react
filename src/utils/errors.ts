import { AlertUtil } from './alert';

export const errCb = (val: string) => {
  AlertUtil.getRef()?.show({ label: val, type: 'error' });
};
