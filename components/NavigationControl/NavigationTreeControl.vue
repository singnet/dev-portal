<template>
    <div class="navigation-tree-control-container">
        <button v-if="operationMode" class="navigation-tree-control" @click="changeOperationMode">
            <span>{{ controlButtonContent.label }}</span>
            <SpriteIcon :textIconID="controlButtonContent.textIconID" />
        </button>
    </div>
</template>
<script lang="ts">
import { useRouter } from 'vitepress';
import SpriteIcon from "../Common/SpriteIcon.vue";
import LocalStorageService from '../../services/LocalStorageService';

interface INavigationTreeControlButtonContent {
    label: string;
    textIconID: string;
}

const enum NavigationTreeLocalStorageKeys {
    OPERATION_MODE = "operation_mode",
}

const enum NavigationTreeClassNames {
    COLLAPSED = "collapsed",
    HAS_ACTIVE = "has-active",
}

const enum NavigationNestingLevelsClassNames {
    TEMPLATE = "level-",
    ROOT = "level-0",
}

const enum NavigationSelectors {
    CARET = ".caret",
    COLLAPSIBLE_GROUP = ".VPSidebarItem.collapsible",
}

enum NavigationTreeOperationModes {
    EXCLUDING = "excluding",
    EXPANDED = "expanded",
}

const ControlButtonContentSets: Record<NavigationTreeOperationModes, INavigationTreeControlButtonContent> = {
    [NavigationTreeOperationModes.EXCLUDING]: {
        label: "Single branch",
        textIconID: "single-branch",
    },
    [NavigationTreeOperationModes.EXPANDED]: {
        label: "All branches",
        textIconID: "all-branches",
    }
}

export default {
    components: {
        SpriteIcon
    },
    setup() {
        const { route } = useRouter();

        return {
            route
        }
    },
    data() {
        return {
            sidebarGroups: null,
            operationMode: null,
            ControlButtonContentSets,
            operationModesList: Object.values(NavigationTreeOperationModes) as string[],
        }
    },
    mounted() {
        this.update();
        this.setupExcludingMode();
    },
    computed: {
        controlButtonContent() {
            if (!this.operationMode) {
                return null;
            }

            return this.ControlButtonContentSets[this.operationMode];
        },
        handleOperationModeChange() {
            if (!this.operationMode) {
                return null;
            }
            return this[this.operationMode];
        }
    },
    watch: {
        route: {
            handler() {
                this.update();
            },
            deep: true,
        },
    },
    methods: {
        [NavigationTreeOperationModes.EXCLUDING]() {
            this.closeAllSidebarGroups(true);
        },
        [NavigationTreeOperationModes.EXPANDED]() {
            this.openAllSidebarGroups();
        },
        update(): void {
            this.sidebarGroups = this.getSidebarGroupsFromDocument();

            if (!this.sidebarGroups?.length) {
                this.operationMode = null;
                return;
            }

            this.initOperationMode();
            this.handleOperationModeChange();
        },
        setupExcludingMode(): void {
            if (typeof window === "undefined") {
                return;
            }

            const sidebar: HTMLElement | null = window.document.querySelector('#VPSidebarNav');

            if (!sidebar) {
                return;
            }

            sidebar.addEventListener('click', this.runExcludingMode);
        },
        runExcludingMode(event: Event): void {
            event.stopPropagation();

            if (this.operationMode !== NavigationTreeOperationModes.EXCLUDING) {
                return;
            }

            if (!this.sidebarGroups?.length) {
                return;
            }

            if (!event.target) {
                return;
            }

            // @ts-ignore
            const currentGroup: HTMLElement | null = event.target.closest(NavigationSelectors.COLLAPSIBLE_GROUP);

            if (!currentGroup) {
                return;
            }

            const nestedGroupTree: HTMLElement[] = this.getClosestNestedSidebarGroupsList(currentGroup);
            this.closeAllSidebarGroupsExcept(nestedGroupTree);
        },
        initOperationMode(): void {
            const storedOperationMode: string | null =
                LocalStorageService.getLocalStorageRecord(NavigationTreeLocalStorageKeys.OPERATION_MODE);

            if (!storedOperationMode || !this.operationModesList.includes(storedOperationMode)) {
                this.operationMode = this.operationModesList[0];
                return;
            }

            this.operationMode = storedOperationMode;
        },
        changeOperationMode(): void {
            const nextOperationModeIndex: number = this.operationModesList.indexOf(this.operationMode) + 1;

            if (nextOperationModeIndex === this.operationModesList.length) {
                this.operationMode = this.operationModesList[0];
            } else {
                this.operationMode = this.operationModesList[nextOperationModeIndex];
            }

            LocalStorageService.setLocalStorageRecord(NavigationTreeLocalStorageKeys.OPERATION_MODE, this.operationMode);
            this.handleOperationModeChange();
        },
        getSidebarGroupsFromDocument(): HTMLElement[] | null {
            if (typeof window === "undefined") {
                return null;
            }

            return Array.from(window.document.querySelectorAll(NavigationSelectors.COLLAPSIBLE_GROUP));
        },
        getClosestNestedSidebarGroupsList(interactedGroup: HTMLElement): HTMLElement[] {
            const nestedSidebarGroupsList: HTMLElement[] = [];

            let currentGroup: HTMLElement = interactedGroup;

            nestedSidebarGroupsList.push(currentGroup);

            while (!currentGroup.classList.contains(NavigationNestingLevelsClassNames.ROOT)) {
                const classListValues = Array.from(currentGroup.classList);
                const currentNestingLevelClassName: string | undefined = 
                    classListValues.find((className: string) => className.includes(NavigationNestingLevelsClassNames.TEMPLATE));

                if (!currentNestingLevelClassName) {
                    break;
                }

                const currentLevelNumber: number = +currentNestingLevelClassName.substring(currentNestingLevelClassName.length - 1);

                const nextGroup: HTMLElement | null = 
                    currentGroup.closest(`.${NavigationNestingLevelsClassNames.TEMPLATE}${currentLevelNumber - 1}`);

                if(!nextGroup) {
                    break;
                }

                nestedSidebarGroupsList.push(nextGroup);
                currentGroup = nextGroup;
            }

            return nestedSidebarGroupsList;
        },
        toggleSidebarGroup(sidebarGroup: HTMLElement): void {
            const indicator: HTMLElement | null = sidebarGroup.querySelector(NavigationSelectors.CARET);

            if (!indicator) {
                return;
            }

            indicator.click();
        },
        openSidebarGroup(sidebarGroup: HTMLElement): void {
            const { classList } = sidebarGroup;

            if (!classList.contains(NavigationTreeClassNames.COLLAPSED)) {
                return;
            }

            this.toggleSidebarGroup(sidebarGroup);
        },
        closeSidebarGroup(sidebarGroup: HTMLElement, isActiveIgnored: boolean = false): void {
            const { classList } = sidebarGroup;

            if (isActiveIgnored && classList.contains(NavigationTreeClassNames.HAS_ACTIVE)) {
                return;
            }

            if (classList.contains(NavigationTreeClassNames.COLLAPSED)) {
                return;
            }

            this.toggleSidebarGroup(sidebarGroup);
        },
        openAllSidebarGroups(): void {
            this.sidebarGroups.forEach((sidebarGroup: HTMLElement) => this.openSidebarGroup(sidebarGroup));
        },
        closeAllSidebarGroups(isActiveIgnored: boolean = false): void {
            this.sidebarGroups.forEach((sidebarGroup: HTMLElement) => this.closeSidebarGroup(sidebarGroup, isActiveIgnored));
        },
        closeAllSidebarGroupsExcept(ignoredGroups: HTMLElement[], isActiveIgnored: boolean = false): void {
            if (!ignoredGroups?.length) {
                return;
            }

            console.log("ignoredGroups", ignoredGroups);
            
            const filteredGroupsList = this.sidebarGroups.filter((sidebarGroup: HTMLElement) => !ignoredGroups.includes(sidebarGroup));

            console.log("filteredGroupsList", filteredGroupsList);


            if (!filteredGroupsList?.length) {
                return
            }

            filteredGroupsList.forEach((sidebarGroup: HTMLElement) => this.closeSidebarGroup(sidebarGroup, isActiveIgnored));
        }
    }
}
</script>
<style scoped>
.navigation-tree-control-container {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
}

.sidebar-closed .navigation-tree-control-container {
    display: none;
}

.navigation-tree-control {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.navigation-tree-control span {
    color: var(--vp-c-text-2);
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
}

.navigation-tree-control svg {
    width: 12px;
    height: 13px;
}

.navigation-tree-control:hover {
    cursor: pointer;
}

.navigation-tree-control:hover span {
    color: var(--vp-c-accent);
}

.navigation-tree-control:hover svg {
    filter: var(--vp-icons-active-filter);
}
</style>