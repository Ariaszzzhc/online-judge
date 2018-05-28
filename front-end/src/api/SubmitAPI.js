import {Setting} from "../config";

export default class SubmitAPI {
    static submit(problemId: Number, body: any): Promise {
        return fetch(`${Setting.backEndUrl}/submit/${problemId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    static checkAvailableLanguages(): Promise {
        return fetch(`${Setting.backEndUrl}/submit/checkAvailableLanguages`)
    }
}
