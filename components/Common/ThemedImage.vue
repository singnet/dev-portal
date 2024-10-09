<template>
    <img :src=src :alt=alt />
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
const { srcPath, alt } = defineProps(['srcPath', 'alt']);

const { isDark } = useData()

const themeFolder = (isDarkTheme) => {
    console.log("isDarkTheme: ", isDarkTheme);
    return isDarkTheme ? 'dark' : 'light'
};

const src = computed(() => {
    console.log("isDark: ", isDark);
    return `/assets/images/common/${themeFolder(isDark.value)}/${srcPath}`
})

</script>