<template>
    <a class="current-section" :href="sectionData.path" :class="{ 'active': isActive }">
        <div class="section-icon">
            <SpriteIcon :textIconID="sectionData.textIconID" />
        </div>
        <div class="section-name">
            {{ sectionData.name }}
        </div>
    </a>
</template>
<script lang="ts">
import SpriteIcon from "../Common/SpriteIcon.vue";
import type { DefaultTheme } from "vitepress";

export default {
    components: {
        SpriteIcon
    },
    props: {
        sectionData: {
            type: Object as PropType<DefaultTheme.SidebarItem>,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
.current-section {
    line-height: 32px;
    font-weight: 500;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: var(--vp-c-text-2);
    margin-right: auto;
}

.current-section:hover,
.current-section.active {
    cursor: pointer;
    color: var(--vp-c-accent);
}

.current-section.active {
    cursor: default;
}

.section-icon {
    margin-right: 10px;
    filter: brightness(0) saturate(100%) invert(36%) sepia(9%) saturate(19%) hue-rotate(345deg) brightness(105%) contrast(88%);
}

.current-section:hover .section-icon,
.current-section.active .section-icon {
    filter: none;
}

.section-icon svg {
    width: 16px;
    height: 16px;
}

.sidebar-closed .current-section {
    visibility: hidden;
}
</style>