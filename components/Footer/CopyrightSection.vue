<template>
    <div class="footer-copyright-section">
        <div class="copyright-text">
            <p>
                {{ copyright.text }}
            </p>
        </div>
        <div class="copyright-message">
            <p>
                {{ copyright.message }}
            </p>
        </div>
    </div>
</template>

<script>
import { copyright } from "../../config/content/footerConfig";

export default {
    data() {
        return {
            copyright
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