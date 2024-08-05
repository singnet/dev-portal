<template>
    <div class="navigation-items">
        <div class="navigation-category">
            <NavigationItem :text="item?.text" :link="item?.link" :primary="item?.primary"
                :textIconID="item?.textIconID" />
        </div>
        <div class="navigation-category-items">
            <NavigationItem v-if="item?.items" v-for="categoryLink in item.items" :text="categoryLink?.text"
                :link="categoryLink?.link" :primary="item?.primary" :textIconID="item?.textIconID" />
        </div>
    </div>
</template>
<script>
import NavigationItem from './NavigationItem.vue';
export default {
    components: {
        NavigationItem
    },
    props: {
        item: {
            type: Object
        }
    }
}
</script>
<style scoped>
.navigation-items {
    box-sizing: border-box;
}

.navigation-category-items {
    padding-left: 25px;
}
</style>