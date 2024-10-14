<template>
    <div class="navigation-tree-control-container">
        
    </div>
</template>
<script lang="ts">
import { useSidebar } from 'vitepress/theme'

export const enum NavigationTreeOperationModes {
    EXCLUDING = "excluding",
    EXPANDED = "expanded",
}

export default {
    setup() {
        const { sidebar: sidebarItems } = useSidebar();

        return {
            sidebarItems,
        }
    },
    created() {
        this.sidebarItems[0].collapsed = false;
    },
    data() {
        return {}
    }
}
</script>
<style>

</style>