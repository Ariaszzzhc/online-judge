import {Setting} from "../config";

export default class SubmitHistoryAPI {
    static getSubmitHistories(problemSetId: Number, searchParams: String) {
        return fetch(`${Setting.backEndUrl}/submitHistories/${problemSetId}${searchParams}`)
    }
}
