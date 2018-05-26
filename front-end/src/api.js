import {Setting} from "./config";

export default class ProblemSetAPI {
    static getProblemSets(category: String) {
        let searchParams = new URLSearchParams();
        searchParams.append("category", category);
        return fetch(`${Setting.backEndUrl}/problemSets/search?${searchParams.toString()}`)
    }

    static getProblemSet(problemSetId: Number) {
        return fetch(`${Setting.backEndUrl}/problemSets/${problemSetId}`)
    }
}
