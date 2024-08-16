<template>
        <div class="navigation-card border-conteiner" @click="redirect">
            <div class="image-container">
                <img :src="item?.imageSrc" alt="market">
            </div>
            <div class="card-body">
                <div class="card-info">
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
                </div>
                <div class="card-redirect">
                    <div class="card-redirect-text">
                        <p>
                            Go to the section <SpriteIcon :textIconID="'arrow-icon'" :width="'19px'" :height="'10px'" />
                        </p>
                    </div>
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
    padding: 25px;
    width: 310px;
    border: 1px solid purple;
    border-radius: 25px;
    cursor: pointer;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)),
    linear-gradient(180deg, rgba(119, 71, 255, 0.1) 0%, rgba(143, 0, 255, 0.1) 100%);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card-redirect{
    color: var(--vp-c-black);
    justify-content: center;
    align-items: center;
    display: flex;
}

.dark .card-redirect svg{
    fill: #FAFAFA !important;
}

.card-redirect svg{
    fill: black !important;
}

.dark .card-redirect{
    color: var(--vp-c-white);
}

.navigation-card:hover .card-redirect{
    text-decoration: underline;
}

.navigation-card .image-container img{
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
    align-items: center;
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
    margin-right: 5px;
}

.navigation-card .card-description {
    margin-bottom: 10px;
}

.navigation-card .card-description p {
    font-size: 16px;
    line-height: 24px;
}

.card-redirect p{
    line-height: unset;
    display: flex;
}

svg{
    margin-top: 5%;
}

.card-redirect {
    text-shadow: 10px;
    border: 1px solid var(--vp-accent-border);
    border-radius: 25px;
    padding: 8px;
    background: var(--vp-button-gradient);
}

</style>