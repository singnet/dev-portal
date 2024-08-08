<template>
    <div class="navigation-item" :class="{ 'primary': primary }">
        <div class="navigation-item-icon">
            <SpriteIcon v-if="textIconID" :textIconID="textIconID"/>
        </div>
        <div class="navigation-item-text">
            <a :title="link" :href="link">
                {{ text }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: false
        },
        textIconID: {
            type: String,
            required: false,
        },
        primary: {
            type: Boolean,
            required: false,
            default: false,
        },
    }
}
</script>

<style scoped>
.navigation-item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
}

.navigation-item a {
    color: var(--vp-c-accent);
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.navigation-item.primary a {
    font-weight: bold;
}

.navigation-item svg {
    width: 16px;
    height: 16px;
}

.navigation-item .navigation-item-icon {
    margin-right: 5px;
}
</style>