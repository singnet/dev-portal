<template>
    <div class="navigation-control">
        <!-- <div class="navigation-control" @mouseleave="closeSectionsMenu"> -->
        <div class="control-header">
            <NavigationControlSection v-if="currentSection" :sectionData="currentSection" :isActive="true" />
            <div class="sections-title" v-else>
                Portal sections
            </div>
            <div class="sections-menu-toggler" :class="{ 'active': isSectionsMenuOpen }" @click="toggleSectionsMenu">
                <SpriteIcon :textIconID="'section-menu-icon'" />
            </div>
            <SidebarToggle v-if="!isMobile" />
            <SidebarToggleMobile v-else />
        </div>
        <div class="sections-menu" :class="{ 'closed': !isSectionsMenuOpen }">
            <div v-for="sectionsItem in otherSections" :key="sectionsItem.name" class="sections-menu-item">
                <NavigationControlSection :sectionData="sectionsItem" />
            </div>
        </div>
        <NavigationTreeControl />
    </div>
</template>
<script>
import SidebarToggle from "./SidebarToggle.vue";
import SpriteIcon from "../Common/SpriteIcon.vue";
import NavigationControlSection from "./NavigationControlSection.vue";
import NavigationTreeControl from "./NavigationTreeControl.vue";
import LocalStorageFlagsService from "../../services/LocalStorageFlagsService";
import { Products as Sections, RootSections } from "../../config/content/sidebarContentConfig";
import { useData } from "vitepress";
import SidebarToggleMobile from "./SidebarToggleMobile.vue";

const MenuLocalStorageKeys = {
    IS_MENU_OPEN: "isSectionsMenuOpen",
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
            currentLocation: "",
            sections: Object.values(Sections),
            isSectionsMenuOpen: false,
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
        pageData() {
            this.updateLocation();
        },
        isSectionsMenuOpen() {
            LocalStorageFlagsService.setIsActive(MenuLocalStorageKeys.IS_MENU_OPEN, this.isSectionsMenuOpen);
        },
    },
    computed: {
        isDocsRootDisplayed() {
            return this.currentLocation === RootSections.DOCS.documentPath;
        },
        currentSection() {
            if (this.isDocsRootDisplayed) {
                this.isSectionsMenuOpen = true;
                return null;
            }

            return this.sections.find(section => this.currentLocation.includes(section.path));
        },
        otherSections() {
            const preFilteredSections = this.areDocsExcluded
                ? this.sections.filter(section => section.name !== RootSections.DOCS.name)
                : this.sections;

            if (!this.currentSection) {
                return preFilteredSections;
            }

            return preFilteredSections.filter(section => section.name !== this.currentSection.name);
        },
        isMobile() {
            if (typeof window === 'undefined') {
                return;
            }
            
            return window.innerWidth <= 440
        }
    },
    methods: {
        updateLocation() {
            this.currentLocation = `/${this.pageData.filePath}`;
        },
        toggleSectionsMenu() {
            this.isSectionsMenuOpen = !this.isSectionsMenuOpen;
            this.updateStorageValue();
        },
        openSectionsMenu() {
            this.isSectionsMenuOpen = true;
        },
        closeSectionsMenu() {
            this.isSectionsMenuOpen = false;
        },
    }
}
</script>
<style scoped>
.navigation-control {
    padding-top: 8px;
    padding-bottom: 10px;
    flex: 1 0 auto;
    border-bottom: 1px solid var(--vp-c-divider);
}

.sidebar-closed .navigation-control {
    border-bottom: none;
}

.sidebar-closed .sections-menu,
.sidebar-closed .sections-menu-toggler {
    visibility: hidden;
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
    filter: brightness(0) saturate(100%) invert(48%) sepia(55%) saturate(3955%) hue-rotate(203deg) brightness(102%) contrast(101%);
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