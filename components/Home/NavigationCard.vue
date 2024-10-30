<template>
    <a class="navigation-card card" :href="item.link">
        <div class="image-container">
            <ThemedImage v-if="item.imageFileName" :imageFileName="item.imageFileName" :alt="item.text" />
        </div>
        <div class="card-body">
            <div class="card-info">
                <div class="card-title">
                    <div class="card-title-icon">
                        <SpriteIcon v-if="item.textIconID" :textIconID="item.textIconID" />
                    </div>
                    <div class="card-title-text">
                        <p :title="item.text">
                            {{ item.text }}
                        </p>
                    </div>
                </div>
                <div class="card-description">
                    <p>
                        {{ item.description }}
                    </p>
                </div>
            </div>
            <div class="card-redirect gradient-border">
                <div class="card-redirect-text">
                    <p>
                        Go to the section 
                        <SpriteIcon :textIconID="'arrow-icon'" :width="'19px'" :height="'10px'" />
                    </p>
                </div>
            </div>
        </div>
    </a>
</template>

<script lang="ts">
import ThemedImage from '../Common/ThemedImage.vue';

export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    components: {
        ThemedImage
    }
}

</script>

<style scoped>
.navigation-card {
    padding: 25px;
    width: 310px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    color: var(--vp-c-text-1) !important;
    gap: 10px;
    text-decoration: none;
}

.navigation-card .image-container img {
    border-radius: 20px;
    width: 265px;
    height: 135px;
    object-fit: cover;
}

.navigation-card p {
    padding: 0;
    margin: 0;
}

.navigation-card svg {
    width: 24px;
    height: 18px;
}

.navigation-card .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.navigation-card .card-title {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
}

.navigation-card .card-title-text {
    overflow: hidden;
}

.navigation-card .card-title-text p {
    font-size: 22px;
    line-height: 30px;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
}

.navigation-card .card-title-icon {
    flex: 0 0 auto;
    margin-right: 5px;
    height: 30px;
    display: flex;
    align-items: center;
}

.navigation-card .card-description {
    margin-bottom: 10px;
}

.navigation-card .card-description p {
    font-size: 16px;
    line-height: 24px;
}

.card-redirect p {
    line-height: unset;
    display: flex;
}

svg {
    margin-top: 5%;
}

.card-redirect {
    border-radius: 50px;
    position: relative;
    padding: 15px 20px;
    color: var(--vp-c-black);
    justify-content: center;
    align-items: center;
    display: flex;
}

.card-redirect:hover,
.card-redirect::before,
.navigation-card:hover .card-redirect {
    box-shadow: 0 0 10px var(--vp-accent-border);
}

.dark .card-redirect svg {
    fill: #FAFAFA !important;
}

.card-redirect svg {
    fill: black !important;
}

.dark .card-redirect {
    color: var(--vp-c-white);
}

.gradient-border::before {
    border-radius: 50px;
}

@media (max-width: 640px) {
    .navigation-card .card-title-text p {
        white-space: wrap;
    }
}
</style>