<template>
    <div class="footer-section" :class="{ 'inverted': footerSectionData?.isInverted }">
        <div v-if="footerSectionData.logo" class="footer-logo">
            <img :src="footerSectionData.logo" />
        </div>
        <div v-if="footerSectionData.items">
            <div class="footer-section-title">
                <p>
                    {{ footerSectionData.title }}
                </p>
            </div>
            <div class="footer-section-items">
                <div v-for="footerSectionItem in footerSectionData.items" class="footer-section-item">
                    <p>
                        {{ footerSectionItem.text }}
                    </p>
                </div>
            </div>
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
.footer-section {
    margin-right: auto;
}

.footer-section:first-child {
    margin-right: 0;
    padding: 0;
}

.footer-section-title p {
    font-size: 24px;
    line-height: 23px;
    margin-bottom: 25px;
}

.footer-section-item p {
    font-size: 16px;
    line-height: 24px;
}

.inverted p {
    text-align: right;
}

.inverted {
    border-right: solid 1px white;
}

.footer-section {
    padding: 20px;
    padding-top: 10px;
}
</style>