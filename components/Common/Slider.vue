<template>
    <swiper
        class="swiper-container"
        :effect="'creative'"
        :creativeEffect="{
            limitProgress: 2,
            prev: {
                opacity: 0.6,
                translate: [0, '70%', 10],
            },
            next: {
                translate: [0, '-100%', -100],
            },
        }" 
        :space-between="20"
        :direction="'vertical'"
        :pagination="{
            clickable: true,
        }"
        :loop=true
        :mousewheel="{
            thresholdDelta: 70
        }"
        :keyboard="{
            enabled: true
        }"
        :slidesPerView="3"
    >
        <swiper-slide v-for="item in sliderItems" :key="item.text">
                <ToolsComponent :item="item" />
        </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
</template>

<script>
import ToolsComponent from "../Home/ToolsComponent.vue";
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/vue';
import { EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { register } from 'swiper/element/bundle';
register();

export default {
    props: {
        sliderItems: [ Object ]
    },
    components: {
        Swiper,
        SwiperSlide,
        ToolsComponent
    },
    setup() {
      return {
        modules: [Pagination, A11y],
        EffectFade,
      };
    }
};

</script>

<style scoped>
    :deep(.swiper-slide) {
    min-height: 200px;
    }

    :deep(.swiper-pagination-bullet) {
        background-color: var(--vp-c-accent);
    }
</style>