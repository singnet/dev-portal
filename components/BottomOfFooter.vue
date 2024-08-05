<template>
    <div v-if="footerSectionData.copyright">
        <div class="footer-section-copyright">
            <p>
                {{ footerSectionData.copyright }}
            </p>
            <p>
                {{ footerSectionData.message }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        footerSectionData: {
            type: Object
        }
    }
}
</script>
<style>

</style>