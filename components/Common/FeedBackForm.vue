<template>
    <div class="feedback-form-holder">
        <div class="feedback-form" :class="{'gradient-border': !isMobile, 'hidden': !isFormDisplayed }">
            <div class="form-header">
                <h2>Feedback form</h2>
                <button @click="toggleFormVisibility">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" width="15px" viewBox="0 0 20 20">
                        <line x1="0" y1="00" x2="20" y2="20" stroke-linecap="round" />
                        <line x1="0" y1="20" x2="20" y2="0" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label for="name">
                            Name
                        </label>
                        <input id="name" v-model="name" placeholder="Enter your name" />
                    </div>
                    <div class="form-field">
                        <label for="email">
                            Email
                        </label>
                        <input id="email"  v-model="email" placeholder="Enter your email" />
                    </div>
                    <div class="form-field">
                        <label for="Feedback">
                            Feedback
                        </label>
                        <textarea id="Feedback" v-model="feedback" placeholder="Enter your feedback" />
                    </div>
                    <div class="form-field">
                        <label for="category">
                            Support category
                        </label>
                        <!-- <select id="category" v-model="category" placeholder="Select a category">
                            <option value="question">Question</option>
                            <option value="bug">Bug</option>
                            <option value="feedback">Feedback</option>
                        </select> -->
                        <DropdownList :options="options" @select="selectCategory"/>
                    </div>
                </fieldset>
                <div class="submit-btn-container" :class="{'gradient-border': isSubmitAvailible}">
                    <button class="submit-button" type="button" :disabled="!isSubmitAvailible" @click="sendFeedback">Submit</button>
                </div>
            </form>
        </div>
        <div class="feedback-form-launcher" :class="{ 'hidden': isFormDisplayed }">
            <button @click="toggleFormVisibility">
                <img src="/assets/images/common/feedback.png" alt="feedback" />
            </button>
        </div>
    </div>
</template>

<script>
import DropdownList from './DropdownList.vue';
import endpoints from '../../utils/constants/endpoints';

export default {
    data() {
        return {
            isFormDisplayed: false,
            name: '',
            email: '',
            feedback: '',
            category: 'question',
            options: [
                {value: "question", title: "Question"},
                {value: "bug", title: "Bug"},
                {value: "feedback", title: "Feedback"},
            ]
        }
    },
    components: {
        DropdownList
    },
    computed: {
        isSubmitAvailible() {
            return this.name &&
                this.email &&
                this.feedback &&
                this.category
        },
        isMobile() {
            return window.innerWidth < 450
        }
    },
    methods: {
        toggleFormVisibility() {
            this.isFormDisplayed = !this.isFormDisplayed;
        },
        selectCategory(option) {
            this.category = option.value;
        },
        resetForm() {
            this.name = '';
            this.email = '';
            this.feedback = '';
            this.category = 'question';
        },
        async sendFeedback() {
            try {
                let options = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        source: "DEVELOPER_PORTAL",
                        name: this.name,
                        address: "",
                        email: this.email,
                        phone_no: "",
                        message_type: this.category,
                        subject: "",
                        message: this.feedback,
                        attachment_details: {},
                    })
                };
                await fetch(endpoints.FEEDBACK, options);
            } catch (error) {
                console.log("error on feedback request: ", error);
            } finally {
                this.resetForm();
            }
        }    
    }
}
</script>

<style scoped>
.feedback-form-holder {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    position: fixed;
    bottom: 50px;
    right: 30px;
    z-index: 150;
}

.gradient-border::before {
    border-radius: 8px;
}

.feedback-form {
    max-height: 600px;
    border-radius: 8px;
    backdrop-filter: blur(2px);
    background: var(--feedback-form-background);
    color: var(--feedback-form-font-color);
    width: 400px;
    padding: 25px;
    right: 0;
    bottom: 0;
    position: absolute;
    transition: var(--feedback-form-transition) all;
}

.dark .feedback-form {
    color: var(--feedback-form-font-color);
    background: var(--feedback-form-background);
}

.feedback-form.hidden,
.feedback-form-launcher.hidden {
    visibility: hidden;
    overflow: hidden;
    padding: 0;
    width: 0;
    max-height: 0;
}

.form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

fieldset,
form {
    border: none !important;
}

.form-header h2 {
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
}

.form-header svg {
    transition: var(--feedback-form-transition) all;
}

.form-header svg:hover {
    transform: scale(1.3);
}

.form-header line {
    stroke-width: 2;
    stroke: var(--feedback-form-font-color);
}

.dark .form-header line {
    stroke: var(--feedback-form-font-color);
}

.form-field {
    margin-bottom: 16px;
    position: relative;
}

.form-field label {
    font-size: 13px;
    line-height: 16px;
    margin-bottom: 7px;
    font-weight: 500;
    width: 100%;
}

.form-field input,
.form-field textarea,
.form-field select {
    display: block;
    width: 100%;
    border-radius: 8px;
    font-size: 15px;
    line-height: 20px;
    padding: 8px 12px;
    background-color: var(--feedback-form-input-background);
}

.form-field select {
    appearance: auto;
}

.submit-btn-container {
    position: relative;
}

.submit-btn-container .submit-button {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    padding: 8px 0;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
}

.submit-button:disabled {
    background-color: var(--feedback-form-input-background);
    color: var(--vp-c-lightgray);
}

.dark .submit-button:disabled {
    color: var(--vp-c-gray);
}

.submit-button:hover {
    box-shadow: 0 0 10px var(--vp-accent-border);
}

.form-field textarea {
    min-height: 70px;
    max-height: 150px;
}

.dark .form-field input,
.form-field textarea {
    background-color: var(--feedback-form-input-background);
}

.feedback-form-launcher {
    width: 100px;
    transition: var(--feedback-form-transition) all;
}

.feedback-form-launcher:hover {
    transform: scale(1.1);
}

@media (max-width: 450px) {
    .feedback-form {
        width: 100%;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 0 10px var(--vp-accent-border);
    }
    .feedback-form-holder {
        right: 0;
        bottom: 0
    }
}
</style>