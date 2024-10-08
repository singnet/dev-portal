<template>
     
    <div class="dropdown-holder" @mouseover="isOptionsShown = true" @mouseleave="isOptionsShown = false">
        <div>{{ selectedItem.title }}</div>
        <transition name="fade">
        <div v-show="isOptionsShown" class="options-holder">
            <div 
                v-for="option in options" 
                :key="option.value" 
                :value="option.value" 
                @click="selectItem(option)" 
                class="option"
            >
                {{ option.title }}
            </div>
        </div>
    </transition>
    </div>
</template>

<script>
export default { 
    props: ['options'],
    data() {
        return {
            isOptionsShown: false,
            selectedItem: this.options[0]
        }
    },
    methods: {
        selectItem(item){
            this.selectedItem = item;
            this.$emit('select', item)
        }
    }
}
</script>

<style scoped>
    .dropdown-holder {
        position: relative;
        display: block;
        width: 100%;
        border-radius: 8px;
        font-size: 15px;
        line-height: 20px;
        padding: 8px 12px;
        background-color: var(--feedback-form-input-background);
    }

    .options-holder {
        width: 100%;
        border-radius: 8px;
        z-index: 150;
        position: absolute;
        background-color: var(--vp-c-bg-elv);
    }

    .option {
        padding: 5px 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all .3s
    }

    .option:hover {
        background-color: var(--vp-c-default-soft);
        color: var(--vp-c-brand-1);
        transition: all .3s
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }

</style>