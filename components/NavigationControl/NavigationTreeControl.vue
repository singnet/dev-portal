<template>
    <div class="navigation-tree-control-container">
        <button @click="openAllSidebarGroups">OPEN</button>
        <button @click="closeAllSidebarGroups">CLOSE</button>
    </div>
</template>
<script lang="ts">
import { useSidebar } from 'vitepress/theme';
import { useRouter } from 'vitepress';

export const enum NavigationTreeOperationModes {
    EXCLUDING = "excluding",
    EXPANDED = "expanded",
}

export default {
    setup() {
        const { route } = useRouter();

        return {
            route
        }
    },
    data() {
        return {
            sidebarGroups: null,
        }
    },
    mounted() {
        this.sidebarGroups = this.getSidebarGroupsFromDocument();
    },
    watch: {
        route: {
            handler(newRoute, oldRoute) {
                this.sidebarGroups = this.getSidebarGroupsFromDocument();
            },
            deep: true,
        },
    },
    methods: {
        getSidebarGroupsFromDocument(): NodeList | null {
            if (typeof window === "undefined") {
                return new Node;
            }

            return window.document.querySelectorAll(".VPSidebarItem.collapsible");
        },
        openSidebarGroup(group) {
            group.classList.remove("collapsed");
        },
        closeSidebarGroup(group) {
            group.classList.add("collapsed");
        },
        openAllSidebarGroups() {
            this.sidebarGroups.forEach(sidebarGroup => this.openSidebarGroup(sidebarGroup));
        },
        closeAllSidebarGroups() {
            this.sidebarGroups.forEach(sidebarGroup => this.closeSidebarGroup(sidebarGroup));
        }
    }
}
</script>
<style></style>