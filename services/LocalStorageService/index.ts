export default class LocalStorageService {
    public static getLocalStorageRecord(
        localStorageKey: string
    ): string | null {
        if (typeof window === "undefined") {
            return null;
        }

        return window.localStorage.getItem(localStorageKey);
    }

    public static setLocalStorageRecord(
        localStorageKey: string,
        value: string
    ): void {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.setItem(localStorageKey, value);
    }
}
