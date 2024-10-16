<template>
    <footer class="custom-footer">
        <div class="wrapper">
            <div class="container">
                <div class="footer-content-container">
                    <FooterSection v-for="section in footerConfig" :footerSectionData="section" />
                </div>
                <div class="footer-copyright-container">
                    <CopyrightSection />
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import FooterSection from './FooterSection.vue';
import CopyrightSection from './CopyrightSection.vue';
import footerConfig from "../../config/content/footerConfig";

export default {
    components: {
        FooterSection,
        CopyrightSection
    },
    data() {
        return {
            footerConfig,
        }
    },
}
</script>

<style>
.custom-footer {
    background-color: var(--vp-c-black);
    color: var(--vp-c-white);
    position: relative;
    z-index: 100;
}

.footer-content-container {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    padding: 25px 0 40px 0;
}
</style>