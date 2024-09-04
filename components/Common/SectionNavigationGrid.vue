<template>
    <div class="section-navigation-container" >
        <a 
            class="section-navigation-block" 
            v-for="item in items"
            :key="item.link"
            :href="item.link" 
        >
            {{item.text}}
        </a>
    </div>
</template>

<script>
import sidebarContentConfig from '../../config/content/sidebarContentConfig';

export default {
    props: {
        sectionName: String,
    },
    computed: {
        items() {
            const [currentSection] = sidebarContentConfig.filter(item => item.text === this.sectionName)
            return currentSection.items;
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
    background-color: var(--vp-sidebar-bg-color);
    text-decoration: none;
}

.section-navigation-block:hover {
    border-color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
    .section-navigation-container {
        grid-template-columns: 1fr;
    }
}
</style>