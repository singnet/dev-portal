<template>
    <div class="navigation-card">
        <div class="image-container">
            <img :src="item?.imageSrc" alt="market">
        </div>
        <div class="card-title">
            <div class="card-title-icon">
                <SpriteIcon v-if="item.textIconID" :textIconID="item.textIconID" />
            </div>
            <div class="card-title-text">
                <p :title="item.text">
                    {{ item?.text }}
                </p>
            </div>
        </div>
        <div class="card-description">
            <p>
                {{ item?.description }}
            </p>
        </div>
        <div class="card-tree">
            <NavigationItems v-if="item?.items" v-for="navigationSectionContent in item?.items"
                :item="navigationSectionContent" />
        </div>
    </div>
</template>

<script>
import NavigationItems from './NavigationItems.vue';
export default {
    components: {
        NavigationItems
    },
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style scoped>
.navigation-card {
    box-sizing: border-box;
    padding: 25px;
    width: 310px;
    background-color: var(--vp-c-white);
    border-width: 1px;
    border-style: solid;
    border-color: var(--vp-c-lightgray);
    border-radius: 4px;
}

.dark .navigation-card {
    background-color: var(--vp-c-darkgray);
    border-color: var(--vp-c-gray);
}

.navigation-card .image-container {
    margin-bottom: 10px;
}

.navigation-card p {
    padding: 0;
    margin: 0;
}

.navigation-card svg {
    width: 16px;
    height: 16px;
}

.navigation-card .card-title {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

.navigation-card .card-title-text {
    overflow: hidden;
}

.navigation-card .card-title-text p {
    font-size: 24px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.navigation-card .card-title-icon {
    flex: 0 0 auto;
    margin-right: 15px;
}

.navigation-card .card-description {
    margin-bottom: 15px;
}

.navigation-card .card-description p {
    font-size: 16px;
    line-height: 24px;
}
</style>