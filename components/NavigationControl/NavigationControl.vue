<template>
    <div class="navigation-control">
        <!-- <div class="navigation-control" @mouseleave="closeSectionsMenu"> -->
        <div class="control-header">
            <NavigationControlSection v-if="currentSection" :sectionData="currentSection" :isActive="true" />
            <div class="sections-title" v-else>
                Portal sections
            </div>
            <div class="sections-menu-toggler" :class="{ 'active': isSectionsMenuOpen }" @click.stop="toggleSectionsMenu">
                <SpriteIcon :textIconID="'section-menu-icon'" />
            </div>
            <SidebarToggleMobile v-if="isMobile" />
            <SidebarToggle v-else />
        </div>
        <div class="sections-menu" :class="{ 'closed': !isSectionsMenuOpen }">
            <div v-for="sectionsItem in otherSections" :key="sectionsItem.name" class="sections-menu-item">
                <NavigationControlSection :sectionData="sectionsItem" />
            </div>
        </div>
        <NavigationTreeControl />
    </div>
</template>
<script lang="ts">
import SidebarToggle from "./SidebarToggle.vue";
import SpriteIcon from "../Common/SpriteIcon.vue";
import SidebarToggleMobile from "./SidebarToggleMobile.vue";
import NavigationTreeControl from "./NavigationTreeControl.vue";
import NavigationControlSection from "./NavigationControlSection.vue";
import LocalStorageFlagsService from "../../services/LocalStorageFlagsService";
import { Products as Sections, RootSections, ISectionData } from "../../config/content/sidebarContentConfig";
import { useData } from "vitepress";

const enum MenuLocalStorageKeys {
    IS_MENU_OPEN = "isSectionsMenuOpen",
}

export default {
    props: {
        areDocsExcluded: {
            type: Boolean,
            default: true,
        }
    },
    components: {
        NavigationControlSection,
        NavigationTreeControl,
        SidebarToggle,
        SidebarToggleMobile,
        SpriteIcon
    },
    setup() {
        const { page: pageData } = useData();

        return {
            pageData
        }
    },
    data() {
        return {
            currentLocation: "" as string,
            sections: Object.values(Sections) as ISectionData[],
            isSectionsMenuOpen: false as boolean,
        }
    },
    created() {
        this.updateLocation();

        if (this.isDocsRootDisplayed) {
            this.isSectionsMenuOpen = true;
            return;
        }

        this.isSectionsMenuOpen = LocalStorageFlagsService.getIsActive(MenuLocalStorageKeys.IS_MENU_OPEN)
    },
    watch: {
        pageData(): void {
            this.updateLocation();
        },
        isSectionsMenuOpen(): void {
            LocalStorageFlagsService.setIsActive(MenuLocalStorageKeys.IS_MENU_OPEN, this.isSectionsMenuOpen);
        },
    },
    computed: {
        isDocsRootDisplayed(): boolean {
            return this.currentLocation === RootSections.DOCS.documentPath;
        },
        currentSection(): ISectionData | null {
            if (this.isDocsRootDisplayed) {
                this.isSectionsMenuOpen = true;
                return null;
            }

            return this.sections.find((section: ISectionData) => this.currentLocation.includes(section.path));
        },
        otherSections(): ISectionData[] {
            const preFilteredSections = this.areDocsExcluded
                ? this.sections.filter((section: ISectionData) => section.name !== RootSections.DOCS.name)
                : this.sections;

            if (!this.currentSection) {
                return preFilteredSections;
            }

            return preFilteredSections.filter((section: ISectionData) => section.name !== this.currentSection.name);
        },
        isMobile() {
            if (typeof window === 'undefined') {
                return;
            }

            return window.innerWidth <= 440
        }
    },
    methods: {
        updateLocation(): void {
            this.currentLocation = `/${this.pageData.filePath}`;
        },
        toggleSectionsMenu(): void {
            this.isSectionsMenuOpen = !this.isSectionsMenuOpen;
        },
        openSectionsMenu(): void {
            this.isSectionsMenuOpen = true;
        },
        closeSectionsMenu(): void {
            this.isSectionsMenuOpen = false;
        },
    }
}
</script>
<style scoped>
.navigation-control {
    padding-top: 8px;
    flex: 1 0 auto;
}

.navigation-control .sections-menu {
    border-bottom: 1px solid var(--vp-c-divider);
}

.sidebar-closed .sections-menu,
.sidebar-closed .sections-menu-toggler {
    visibility: hidden;
    border-bottom: none;
}

.control-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
}

.sections-title {
    font-weight: 500;
    margin-right: auto;
}

.sections-menu-toggler {
    cursor: pointer;
    margin-right: 15px;
    flex-shrink: 0;
}

.sections-menu-toggler svg {
    width: 16px;
    height: 16px;
}

.sections-menu-toggler:hover,
.sections-menu-toggler.active {
    filter: var(--vp-icons-active-filter);
}

.sections-menu {
    padding-left: 15px;
    padding-bottom: 10px;
    max-height: 300px;
    transition: .3s max-height;
    display: flex;
    flex-wrap: wrap;
    column-gap: 30px;
}

.sections-menu.closed {
    padding-bottom: 0;
    max-height: 0;
    overflow: hidden;
}
</style>