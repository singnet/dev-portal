<template>
    <div class="navigation-section-container">
        <NavigationCard v-for="item in docsConfig" :item="item" />
    </div>
</template>
<script>
import NavigationCard from "./NavigationCard.vue";
import docsConfig from "../config/content/docsConfig";

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
<style>
.navigation-section-container {
    padding-top: 5%;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
}
</style>