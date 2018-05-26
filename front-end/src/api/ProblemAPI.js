import {Setting} from "../config";

export default class ProblemAPI {
    static getProblem(problemId: Number) {
        return fetch(`${Setting.backEndUrl}/problems/${problemId}`)
    }
}
