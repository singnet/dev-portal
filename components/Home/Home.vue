<template>
    <div class="home-container">
        <HomeHeader />
        <NavigationSection />
        <ToolsSection />
    </div>
</template>

<script>
import HomeHeader from "./HomeHeader.vue";
import NavigationSection from "./NavigationSection.vue";
import ToolsSection from "./ToolsSection.vue";

export default {
    components: {
        HomeHeader,
        NavigationSection,
        ToolsSection,
    }
}
</script>

<style scoped>
.home-container {
    padding-top: 3%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.dark .card-redirect svg{
    fill: #ffffff !important;
}

.card-redirect svg{
    fill: #3C3C43;
}

</style>