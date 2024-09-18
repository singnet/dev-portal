<template>
    <div class="navigation-section-container">
        <h1 class="navigation-section-title">
            Products docs
        </h1>
        <NavigationCard v-for="item in navigationCards" :item="item" />
    </div>
</template>

<script >
import NavigationCard from "./NavigationCard.vue";
import docsConfig from "../../config/content/docsConfig";
import { useData } from 'vitepress'

export default {
    components: {
        NavigationCard
    },
    // data() {
    //     return {
    //         docsConfig
    //     }
    // },
    setup() {
        // const { isDark } = useData()
        // console.log("isDark: ", isDark);
        // const themeFolder = isDark ? 'dark' : 'light';
    },
    computed: {
        // isDark(){
        //     const { isDark } = useData()
        //     return isDark.value
        // },
        navigationCards() {
            const { isDark } = useData()
            return docsConfig(isDark.value)
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