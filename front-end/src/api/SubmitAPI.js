import {Setting} from "../config";

export default class SubmitAPI {
    static submit(problemId: Number, body: any) {
        return fetch(`${Setting.backEndUrl}/submit/${problemId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
}