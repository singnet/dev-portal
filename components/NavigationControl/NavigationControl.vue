<template>
    <div class="navigation-control">
        <!-- <div class="navigation-control" @mouseleave="closeSectionsMenu"> -->
        <div class="control-header">
            <NavigationControlSection :name="currentSection.name" :textIconID="currentSection.textIconID"
                :isActive="true" @click="navigate(currentSection.path)" />
            <div class="sections-menu-toggler" :class="{ 'active': isSectionsMenuOpen }" @click="toggleSectionsMenu">
                <SpriteIcon :textIconID="'section-menu-icon'" />
            </div>
            <SidebarToggle />
        </div>
        <div class="sections-menu" :class="{ 'closed': !isSectionsMenuOpen }">
            <div v-for="sectionsItem in otherSections" :key="sectionsItem.name" class="sections-menu-item">
                <NavigationControlSection :name="sectionsItem.name" :textIconID="sectionsItem.textIconID"
                    @click="navigate(sectionsItem.path)" />
            </div>
        </div>
    </div>
</template>
<script>
import SidebarToggle from "./SidebarToggle.vue";
import SpriteIcon from "../Common/SpriteIcon.vue";
import NavigationControlSection from "./NavigationControlSection.vue"
import { Products as Sections } from "../../config/content/sidebarContentConfig";

export default {
    components: {
        NavigationControlSection,
        SidebarToggle,
        SpriteIcon
    },
    data() {
        return {
            sections: Object.values(Sections),
            isSectionsMenuOpen: false,
        }
    },
    computed: {
        currentLocation() {
            return typeof window !== 'undefined' ? window.location.pathname : "";
        },
        currentSection() {
            return this.sections.find(section => this.currentLocation.includes(section.path)) || this.sections[0];
        },
        otherSections() {
            return this.sections.filter(section => section.name !== this.currentSection.name);
        }
    },
    methods: {
        toggleSectionsMenu() {
            this.isSectionsMenuOpen = !this.isSectionsMenuOpen;
        },
        openSectionsMenu() {
            this.isSectionsMenuOpen = true
        },
        closeSectionsMenu() {
            this.isSectionsMenuOpen = false
        },
        navigate(pathname) {
            if (typeof window === 'undefined') {
                return;
            }

            window.location.pathname = pathname;
        }
    }
}
</script>
<style scoped>
.navigation-control {
    padding-top: 25px;
    padding-bottom: 10px;
    flex: 1 0 auto;
    border-bottom: 1px solid var(--vp-c-divider);
}

.sidebar-closed .sections-menu,
.sidebar-closed .sections-menu-toggler {
    visibility: hidden;
}

.control-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
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
}

.sections-menu.closed {
    padding-bottom: 0;
    max-height: 0;
    overflow: hidden;
}
</style>