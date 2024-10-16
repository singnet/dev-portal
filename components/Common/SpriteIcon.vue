<template>
    <svg :width="width" :height="height">
        <use :xlink:href="iconFullPath"/>
    </svg>
</template>

<script lang="ts">
    const SVG_SPRITE_LINK_PATH: string = "/assets/images/sprite.svg#";

    export default {
        props: {
            textIconID: {
                type: String,
                required: true,
                default: "",
            },
            width: {
                type: String,
                required: false,
            },
            height: {
                type: String,
                required: false,
            }
        },
        computed: {
            iconFullPath(): string {
                return `${SVG_SPRITE_LINK_PATH}${this.textIconID}`;
            }
        }
    }
</script>