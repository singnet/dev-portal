import LocalStorageService from "../LocalStorageService";

export const enum LocalStorageFlags {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export default class LocalStorageFlagsService {
    public static getIsActive(localStorageKey: string): boolean {
        const acquiredRecord = LocalStorageService.getLocalStorageRecord(localStorageKey);

        return !acquiredRecord || acquiredRecord === LocalStorageFlags.ACTIVE;
    }

    public static setIsActive(localStorageKey: string, isActive: boolean) {
        LocalStorageService.setLocalStorageRecord(
            localStorageKey,
            isActive ? LocalStorageFlags.ACTIVE : LocalStorageFlags.INACTIVE
        );
    }
}
