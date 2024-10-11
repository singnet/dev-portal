<template>
    <div class="navigation-section-container">
        <h1 class="navigation-section-title">
            Products docs
        </h1>
        <NavigationCard v-for="item in docsConfig" :item="item" />
    </div>
</template>

<script lang="ts">
import NavigationCard from "./NavigationCard.vue";
import docsConfig from "../../config/content/docsConfig";

export default {
    components: {
        NavigationCard
    },
    data() {
        return {
            docsConfig
        }
    }
}
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