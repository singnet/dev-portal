<template>
    <div class="tools-section-container">
        <div class="tools-header">
            <h1>
                Tools & Resources
            </h1>
        </div>
        <div class="tools-items-container">
            <div class="tools-header-component">
                <ThemedImage srcPath="tools.png" alt="tools" />
                <p>On our website you will find a convenient block with tools and tools for creating your ideal web resource. Start your creation journey now!</p>
            </div>
            <swiper
                v-if="!isMobile"
                class="swiper-container"
                v-bind="swiperOptions"
            >
                <swiper-slide v-for="item in toolsConfig" :key="item.text">
                     <ToolsComponent  :item="item" />
                </swiper-slide>
            </swiper>
            <div v-else v-for="item in toolsConfig" :key="item.text">
                <ToolsComponent  :item="item" />
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
import ToolsComponent from "./ToolsComponent.vue";
import toolsConfig from "../../config/content/toolsConfig.ts";
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/vue';
import ThemedImage from "../Common/ThemedImage.vue";

import 'swiper/css';
import 'swiper/css/pagination';

import { register } from 'swiper/element/bundle';
register();

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
            toolsConfig,
            toolsCardsLength: toolsConfig.length,
            swiperOptions: {
                effect: 'creative',
                creativeEffect: {
                    limitProgress: 2,
                    prev: {
                        opacity: 0.6,
                        translate: [0, '70%', 10],
                    },
                    next: {
                        translate: [0, '-100%', -100],
                    },
                },
                spaceBetween: 20,
                direction: 'vertical',
                pagination: {
                    clickable: true,
                },
                loop: true,
                mousewheel: {
                    thresholdDelta: 70
                },
                keyboard: {
                    enabled: true
                },
                slidesPerView: 3
            }
        }
    },
    computed: {
        isMobile() {
        if (typeof window === 'undefined') {
            return false;
        }
            return window.screen.width < 640;
        }
    }
};
</script>

<style scoped>
.tools-section-container {
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 25px;
}

.tools-header-component {
    margin-top: 20px;
    border-radius: 25px;
    box-shadow: 0 0 20px var(--vp-c-lightgray);
    background: var(--vp-c-bg) 70%;;
    padding: 24px;
    height: min-content;
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
    max-height: 700px;
    padding: 20px 40px 20px 20px;
    width: 100%;
}

:deep(.swiper-slide) {
  min-height: 200px;
}
:deep(.swiper-pagination-bullet) {
    background-color: var(--vp-c-accent);
}

:deep(.swiper-pagination-bullets) {
    top: 20%;
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