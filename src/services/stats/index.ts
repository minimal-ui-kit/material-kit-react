import { fx } from 'src/configs';
import { ApiRoute } from 'src/constants/fxns';

import type { Stats, UserStats } from './stats.dto';

export default class StatsService {
  static async get() {
    return fx.call<{}, Stats>(ApiRoute.GetStats);
  }

  static async getByUser() {
    return fx.call<{}, UserStats>(ApiRoute.GetUserStats);
  }
}
