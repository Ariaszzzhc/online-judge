export default class StringUtils {
    static firstCharUpperCase(s: String): String {
        if (s === null || s === undefined || s === "") {
            return s
        }
        let lowerCase = s.toLowerCase();
        return lowerCase.charAt(0).toUpperCase() + (lowerCase.length > 1 ? lowerCase.substring(1) : "");
    }
}
