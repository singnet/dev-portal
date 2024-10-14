export const enum LocalStorageFlags {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export default class LocalStorageFlagsService {
    private static getLocalStorageRecord(
        localStorageKey: string
    ): string | null {
        if (typeof window === "undefined") {
            return null;
        }

        return window.localStorage.getItem(localStorageKey);
    }

    private static setLocalStorageRecord(
        localStorageKey: string,
        value: string
    ): void {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.setItem(localStorageKey, value);
    }

    public static getIsActive(localStorageKey: string): boolean {
        const acquiredRecord = this.getLocalStorageRecord(localStorageKey);

        return !acquiredRecord || acquiredRecord === LocalStorageFlags.ACTIVE;
    }

    public static setIsActive(localStorageKey: string, isActive: boolean) {
        this.setLocalStorageRecord(
            localStorageKey,
            isActive ? LocalStorageFlags.ACTIVE : LocalStorageFlags.INACTIVE
        );
    }
}
