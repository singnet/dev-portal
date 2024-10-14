<template>
    <div class="tool-card card">
        <div class="tool-info">
            <h1 class="tool-title">
                {{ item.text }}
            </h1>
            <p class="tool-description">
                {{ item.description }}
            </p>
        </div>
        <a class="tool-redirect">
            <SpriteIcon :textIconID="'github-icon'" :width="'18px'" :height="'18px'" />
            <p>GitHub</p>
        </a>
    </div>
</template>

<script>

export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
p,
h1 {
    padding: 0 !important;
    margin: 0 !important;
}

h1 {
    font-size: 24px !important;
}

.tool-card {
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 24px;
    margin-top: 20px
}


.tool-redirect {
    color: var(--vp-c-black);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.tool-redirect p {
    font-size: 20px;
    font-weight: 600;
}

.dark .tool-redirect {
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

@media (max-width: 400px) {
    .tool-card h1 {
        font-size: 20px !important;
    }

    .tool-card {
        flex-direction: column;
        text-align: center;
    }

    .tool-description {
        font-size: 16px;
    }
}
</style>