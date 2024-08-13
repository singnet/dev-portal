<template>
        <div class="navigation-card" @click="redirect">
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
            <div class="card-redirect">
                <div class="card-redirect-text">
                    <p>
                        Go to the section 
                    </p>
                </div>
                <div class="card-redirect-icon">
                    <SpriteIcon :textIconID="'arrow-icon'" :width="'19px'" :height="'10px'" />
                </div>
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
.navigation-card {
    box-sizing: border-box;
    padding: 25px;
    width: 310px;
    background-color: var(--vp-c-white);
    border-width: 1px;
    border-style: solid;
    border-color: var(--vp-c-lightgray);
    border-radius: 4px;
    cursor: pointer;
}

.card-redirect{
    color: blue;
    justify-content: center;
    align-items: center;
    display: flex;
    align-items: flex-end;
}

.navigation-card:hover .card-redirect{
    text-decoration: underline;
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
    font-size: 22px;
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
.card-redirect p{
    line-height: unset;
}
</style>