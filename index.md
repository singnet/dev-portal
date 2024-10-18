---
layout: home
---
<script setup lang="ts">
    import { ref } from 'vue';
    import { useData } from 'vitepress';

    const themeKey = ref <string> ('');
    console.log('themeKey initial', themeKey.value);
    const { isDark } = useData();
    themeKey.value = !isDark ? 'LIGHT' : 'DARK';

    console.log('themeKey', themeKey.value);
</script>
<Home :key="themeKey" />