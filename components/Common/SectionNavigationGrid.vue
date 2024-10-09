<template>
    <div class="section-navigation-container">
        <a class="section-navigation-block" v-for="item in sectionContent" :key="item.link" :href="item.link">
            {{ item.text }}
        </a>
    </div>
</template>

<script>
import sidebarContentConfig, { Products } from '../../config/content/sidebarContentConfig';

export default {
    props: {
        sectionRoot: String,
    },
    computed: {
        sectionContent() {
            return sidebarContentConfig[this.sectionRoot];
        }
    }
}
</script>

<style scoped>
.section-navigation-container {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.section-navigation-block {
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid var(--vp-c-divider);
    text-decoration: none;
    color: var(--vp-c-text-1);
}

.dark .section-navigation-block {
    background-color: #1e1c4940;
    box-shadow: 0 0 20px rgb(87, 0, 169, 0.35) !important;
}

.section-navigation-block:hover {
    border-color: var(--vp-c-accent);
}

@media (max-width: 768px) {
    .section-navigation-container {
        grid-template-columns: 1fr;
    }
}
</style>