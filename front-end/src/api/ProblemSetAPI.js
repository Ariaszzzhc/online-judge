import {Setting} from "../config";

export default class ProblemSetAPI {
    static getProblemSets(category: String) {
        return fetch(`${Setting.backEndUrl}/problemSets/${category}`)
    }

    static getProblemSet(problemSetId: Number) {
        return fetch(`${Setting.backEndUrl}/problemSets/${problemSetId}`)
    }

    static getProblems(problemSetId: Number) {
        return fetch(`${Setting.backEndUrl}/problemSets/${problemSetId}/problems`)
    }
}
