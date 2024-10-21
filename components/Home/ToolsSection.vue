<template>
    <div class="tools-section-container">
        <div class="tools-header">
            <h1>
                Tools & Resources
            </h1>
        </div>
        <div class="tools-items-container">
            <div class="tools-header-component card">
                <ThemedImage :imageFileName="'tools.webp'" alt="tools" />
                <p>On our website you will find a convenient block with tools for creating your ideal web
                    resource. Start your creation journey now!</p>
            </div>
            <!-- @vue-ignore -->
            <swiper v-if="!isMobile" class="swiper-container" v-bind="swiperOptions">
                <swiper-slide v-for="item in toolsConfig" :key="item.text">
                    <ToolsComponent :item="item" />
                </swiper-slide>
            </swiper>
            <div v-else v-for="item in toolsConfig" :key="item.text">
                <ToolsComponent :item="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SwiperOptions } from 'swiper/types';
import { IToolsSectionItem } from '../../config/content/toolsConfig.ts';
import ToolsComponent from "./ToolsComponent.vue";
import toolsConfig from "../../config/content/toolsConfig.ts";
import ThemedImage from "../Common/ThemedImage.vue";
import 'swiper/css';
import 'swiper/css/pagination';

import { register } from 'swiper/element/bundle';
register();

const swiperOptions: SwiperOptions = {
    effect: 'creative',
    creativeEffect: {
        limitProgress: 3,
        prev: {
            opacity: 0.1,
            translate: ["0%", '100%', 0],
        },
        next: {
            translate: ["0%", '100%', 0],
        },
    },
    direction: 'vertical',
    pagination: {
        clickable: true,
    },
    loop: true,
    mousewheel: {
        thresholdDelta: 80
    },
    keyboard: {
        enabled: true
    },
    slidesPerView: 3,
}

const MOBILE_SCREEN_WIDTH_BREAKPOINT: number = 640; // px

export default {
    components: {
        ToolsComponent,
        Swiper,
        SwiperSlide,
        ThemedImage
    },
    setup() {
        return {
            modules: [Pagination, A11y],
        };
    },
    data() {
        return {
            toolsConfig: toolsConfig as IToolsSectionItem[],
            swiperOptions,
        }
    },
    computed: {
        isMobile(): boolean {
            if (typeof window === 'undefined') {
                return false;
            }

            return window.screen.width < MOBILE_SCREEN_WIDTH_BREAKPOINT;
        },
    },
};
</script>

<style scoped>
.tools-section-container {
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 25px;
}

.tools-header-component {
    padding: 24px;
    height: min-content;
    margin-top: 20px;
}

.tools-items-container {
    display: grid;
    gap: 30px;
    justify-content: space-between;
    grid-template-columns: 1fr 2fr;
}

.tools-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 500px;
}

.swiper-container {
    max-height: 500px;
    padding: 0 40px;
    width: 100%;
}

:deep(.swiper-slide) {
    min-height: 150px;
}

:deep(.swiper-pagination-bullet) {
    background-color: var(--vp-c-accent);
}

:deep(.swiper-pagination-bullets) {
    top: 20%;
}

:deep(.swiper-slide-visible) {
    opacity: 1 !important;
}

.tools-header {
    text-align: center;
}

@media (max-width: 1024px) {
    .tools-header-component {
        display: none;
    }

    .tools-items-container {
        grid-template-columns: 1fr
    }
}
</style>