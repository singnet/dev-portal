<template>
    <footer class="custom-footer">
        <FooterSection v-for="section in footerConfig" :footerSectionData="section"/>
        <BottomOfFooter v-for="section in footerConfig" :footerSectionData="section"/>
    </footer>
</template>
<script>
import FooterSection from './FooterSection.vue';
import footerConfig from "../config/content/footerConfig";
import BottomOfFooter from './BottomOfFooter.vue';

export default {
    components: {
        FooterSection,
        BottomOfFooter
    },
    data() {
        return {
            footerConfig,
        }
    },
}
</script>
<style>
.custom-footer{
    background-color: var(--vp-c-black);
    color: var(--vp-c-white);
    display: flex;
    flex-wrap:wrap;
    padding: 20px;
    justify-content: space-between;
    position: relative;
    z-index: 100;
    height: 400px;
    resize: both;
    overflow: scroll;
}
</style>