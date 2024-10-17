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
            this.closeAllSidebarGroups();
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
        getSidebarGroupsFromDocument(): NodeList | null {
            if (typeof window === "undefined") {
                return null;
            }

            return window.document.querySelectorAll(NavigationTreeClassNames.COLLAPSIBLE_GROUP);
        },
        openSidebarGroup(sidebarGroup: HTMLElement): void {
            sidebarGroup.classList.remove(NavigationTreeClassNames.COLLAPSED);
        },
        closeSidebarGroup(sidebarGroup: HTMLElement): void {
            if (sidebarGroup.classList.contains(NavigationTreeClassNames.HAS_ACTIVE)) {
                return;
            }
            sidebarGroup.classList.add(NavigationTreeClassNames.COLLAPSED);
        },
        openAllSidebarGroups(): void {
            this.sidebarGroups.forEach((sidebarGroup: HTMLElement) => this.openSidebarGroup(sidebarGroup));
        },
        closeAllSidebarGroups(): void {
            this.sidebarGroups.forEach((sidebarGroup: HTMLElement) => this.closeSidebarGroup(sidebarGroup));
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