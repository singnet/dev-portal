<template>
    <div class="footer-section" :class="{ 'text-right': footerSectionData?.isTextright }">
        <!-- <div v-if="footerSectionData.copyright">
            <div class="footer-section-copyright">
                <p>
                    {{ footerSectionData.copyright }}
                </p>
                
                <p>
                    {{ footerSectionData.message }}
                </p>
            </div>
        </div> -->
        <div v-if="footerSectionData.items">
            <div class="footer-section-title">
                <p>
                    {{ footerSectionData.title }}
                </p>
            </div>
            <div class="footer-section-items">
                <div v-for="footerSectionitem in footerSectionData.items" class="footer-section-item">
                    <p>
                        {{ footerSectionitem.text }}
                    </p>
                </div>
            </div>
        </div>
        <div v-if="footerSectionData.logo" class="footer-logo">
            <img :src="footerSectionData.logo" />
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
p {
    margin: 0;
    padding: 0;
}

.footer-section-title p {
    font-size: 24px;
    line-height: 23px;
}

.footer-section-item p {
    font-size: 16px;
    line-height: 24px;
}

.text-right p {
    text-align: right;
}

.text-right {
    border-right: solid 1px white;
    padding: 15px;
}

.footer-section {
    padding: 15px;
}

.footer-section-copyright {
    text-align: left;
}
</style>