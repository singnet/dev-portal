<template>
    <div class="navigation-section-container">
        <h1 class="navigation-section-title">
            Products docs
        </h1>
        <NavigationCard v-for="item in navigationCards" :item="item" />
    </div>
</template>


<script setup>
import NavigationCard from "./NavigationCard.vue";
import docsConfig from "../../config/content/docsConfig";
import { computed } from 'vue'

import { useData } from 'vitepress'
const { isDark } = useData()

const navigationCards = computed(() => { 
    return docsConfig(isDark.value);
})
console.log("navigationCards: ", navigationCards);

</script>

<style scoped>
.navigation-section-container {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
}

.navigation-section-title {
    flex-basis: 100%;
    text-align: center;
}

.dark .card-redirect svg {
    fill: #ffffff !important;
}

.card-redirect svg{
    fill: #3C3C43;
}

</style>