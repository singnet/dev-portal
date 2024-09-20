<template>
    <img :src=src :alt=alt />
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
const { srcPath, alt } = defineProps(['srcPath', 'alt']);

const { isDark } = useData()

const themeFolder = (isDarkTheme) => isDarkTheme ? 'dark' : 'light';

const src = computed(() => { 
    return `/assets/images/common/${themeFolder(isDark.value)}/${srcPath}`
})

</script>