<template>
    <div class="home-container">
        <HomeHeader />
        <NavigationSection />
    </div>
</template>

<script>
import HomeHeader from "./HomeHeader.vue";
import NavigationSection from "./NavigationSection.vue";

export default {
    components: {
        HomeHeader,
        NavigationSection,
    }
}
</script>

<style scoped>
.home-container {
    padding-top: 3%;
    min-height: 100vh;
}
</style>