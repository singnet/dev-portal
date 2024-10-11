<template>
    <img :src="imageSrc" :alt="alt" />
</template>

<script lang="ts">
import { useData } from 'vitepress'

export const THEME_FOLDER_LOCATION: string = "/assets/images/common/";

export const enum ThemeResourcesFolderNames {
    DARK = "dark",
    LIGHT = "light",
}

export default {
    setup() {
        const { isDark } = useData();

        return {
            isDark
        }
    },
    props: {
        imageFileName: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        }
    },
    computed: {
        themeFolder(): string {
            return `${this.isDark ? ThemeResourcesFolderNames.DARK : ThemeResourcesFolderNames.LIGHT}/`;
        },
        imageSrc(): string {
            return `${THEME_FOLDER_LOCATION}${this.themeFolder}${this.imageFileName}`;
        }
    }
}

</script>