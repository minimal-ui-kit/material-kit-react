import { fx } from "src/configs";
import { ApiRoute } from "src/constants/fxns";
import { Stats } from "./stats.dto";

export default class StatsService {
    static async get(){
        return fx.call<undefined,Stats>(ApiRoute.GetStats)     
    }
}