<template>
    <div class="navigation-card" @click="redirect">
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
    border-radius: 25px;
    box-shadow: 0 0 20px var(--vp-c-lightgray);
    background: var(--vp-c-bg) 70%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
.card-redirect::before  {
    box-shadow: 0 0 10px var(--vp-accent-border);

}

.dark .card-redirect svg {
    fill: #FAFAFA !important;
}

.card-redirect svg {
    fill: black !important;
}

.dark .card-redirect{
    color: var(--vp-c-white);
}

.card-redirect::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px; 
    border: 2px solid transparent;
    background: linear-gradient(0deg, rgba(158, 0, 255, 1),
    rgba(212, 76, 206, 1),
    rgba(40, 40, 218, 1)) border-box;
    -webkit-mask:
        linear-gradient(#fff 0 0) padding-box, 
        linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
}

@media (max-width: 640px) {
    .navigation-card .card-title-text p {
        white-space: wrap;
    }
}

</style>