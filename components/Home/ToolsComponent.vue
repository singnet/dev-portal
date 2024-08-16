<template>
    <div class="tool-card">
        <div class="tool-info">
            <h1 class="tool-title">
                    {{ item?.text }}
                </h1>
            <p class="tool-description">
                {{ item?.description }}
            </p>
        </div>
        <div class="tool-redirect" @click="redirect">
            <SpriteIcon :textIconID="'github-icon'" :width="'18px'" :height="'18px'" /> <p>GitHub</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        redirect() {
            window.location.href = this.item.link;
        }
    }
}
</script>

<style scoped>
    p, h1 {
        padding: 0 !important;
        margin: 0 !important;
        text-align: center !important;
    }

    h1 {
        font-size: 24px !important;
    }

    .tool-card {
        padding: 20px;
        width: 310px;
        height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
    }


    .tool-redirect {
        color: var(--vp-c-black);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .tool-redirect p {
        font-size: 20px;
        font-weight: 600;
    }
    
    .dark .tool-redirect{
        color: var(--vp-c-white)
    }

    .tool-redirect:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .tool-description {
        font-size: 16px;
        line-height: 24px;
        text-overflow: ellipsis;
    }

    .tool-redirect p {
        line-height: unset;
        display: flex;
    }

</style>