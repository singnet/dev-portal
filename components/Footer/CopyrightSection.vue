<template>
    <div class="footer-copyright-section">
        <div class="copyright-text">
            <p>
                {{ copyrightSection.text }}
            </p>
        </div>
        <div v-if="copyrightSection.message" class="copyright-message">
            <p>
                {{ copyrightSection.message }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { copyrightSection } from "../../config/content/footerConfig";

export default {
    data() {
        return {
            copyrightSection
        }
    }
}
</script>

<style scoped>
.footer-copyright-section {
    border-top: 1px solid white;
    padding: 30px 0 45px 0;
}
</style>