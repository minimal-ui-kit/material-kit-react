import { AppAlertMethods } from 'src/components/shared/alert';

export class AlertUtil {
  private static ref: AppAlertMethods | null;

  public static setRef(_ref: AppAlertMethods | null) {
    this.ref = _ref;
  }

  public static getRef(): AppAlertMethods | null {
    return this.ref;
  }
}
