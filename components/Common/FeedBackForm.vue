<template>
    <div class="feedback-form-holder">
        <div class="feedback-form" :class="{ 'gradient-border': !isMobile, 'hidden': !isFormDisplayed }">
            <div class="form-header">
                <h2>Feedback form</h2>
                <button @click="toggleFormVisibility">
                    <SpriteIcon :textIconID="'close-icon'" :width="'15px'" :height="'15px'" />
                </button>
            </div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label for="category">
                            Support category
                        </label>
                        <DropdownList :options="options" @select="selectCategory" />
                    </div>
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
                        <input id="email" :class="{ 'error-field': email && !isEmailValid(email) }" v-model="email"
                            placeholder="Enter your email" />
                    </div>
                    <div class="form-field">
                        <label for="Feedback">
                            Your text
                        </label>
                        <textarea id="Feedback" v-model="feedback" placeholder="Enter your text" />
                    </div>
                </fieldset>
                <div class="submit-btn-container" :class="{ 'gradient-border': isSubmitAvailable }">
                    <button class="submit-button" type="button" :disabled="!isSubmitAvailable || isRequestHandling"
                        @click="sendFeedback">
                        <SpriteIcon v-if="isRequestHandling" :textIconID="'double-check-icon'" :width="'35px'"
                            :height="'20px'" />
                        <span v-else>Submit</span>
                    </button>
                </div>
            </form>
        </div>
        <div class="ready-alert" :class="{ 'hidden': !isRequestSent }">Thank you!
            Our technical support will get in touch with you soon!</div>
        <div class="feedback-form-launcher" :class="{ 'hidden': isFormDisplayed }">
            <button @click="toggleFormVisibility">
                <img src="/assets/images/common/feedback.webp" alt="feedback" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import DropdownList from './DropdownList.vue';
import endpoints from '../../utils/constants/endpoints';
import { OptionType } from './DropdownList.vue';

const enum FeedbackCategory {
    QUESTION = 'question',
    BUG = 'bug',
    FEEDBACK = 'feedback',
}

const MOBILE_SCREEN_WIDTH_BREAKPOINT: number = 450; // px

const EMAIL_VALIDATION_REGEX: RegExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default {
    data() {
        return {
            isRequestHandling: false as boolean,
            isRequestSent: false as boolean,
            isFormDisplayed: false as boolean,
            name: '' as string,
            email: '' as string,
            feedback: '' as string,
            category: 'question' as FeedbackCategory,
            options: [
                { value: "question", title: "Question" },
                { value: "bug", title: "Bug" },
                { value: "feedback", title: "Feedback" },
            ] as OptionType[]
        }
    },
    components: {
        DropdownList
    },
    computed: {
        isSubmitAvailable(): boolean {
            return this.name &&
                this.isEmailValid(this.email) &&
                this.feedback &&
                this.category
        },
        isMobile(): boolean {
            if (typeof window === 'undefined') {
                return false;
            }

            return window.innerWidth < MOBILE_SCREEN_WIDTH_BREAKPOINT;
        },
    },
    methods: {
        isEmailValid(value: string): boolean {
            return EMAIL_VALIDATION_REGEX.test(value);
        },
        toggleFormVisibility(): void {
            this.isFormDisplayed = !this.isFormDisplayed;
        },
        selectCategory(option: OptionType): void {
            this.category = option.value;
        },
        resetForm(): void {
            this.name = '';
            this.email = '';
            this.feedback = '';
            this.category = 'question';
        },
        async showAlert(): Promise<void> {
            this.isRequestSent = true;
            await new Promise(r => setTimeout(r, 2000));
            this.isRequestSent = false;
        },
        async sendFeedback(): Promise<void> {
            try {
                const options: RequestInit = {
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
                if (!this.isRequestHandling) {
                    this.isRequestHandling = true;
                    await fetch(endpoints.FEEDBACK, options);
                }
                this.isFormDisplayed = false;
                await this.showAlert();
            } catch (error) {
                this.isFormDisplayed = false;
                console.log("error on feedback request: ", error);
            } finally {
                this.resetForm();
                this.isRequestHandling = false;
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
    width: 100px;
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

.ready-alert.hidden,
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

input {
    border: 1px solid transparent
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

.error-field {
    border: 1px solid var(--vp-c-danger-1);
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

.submit-button svg {
    margin: 0 auto;
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

.ready-alert {
    width: 200px;
    position: absolute;
    right: 100px;
    bottom: 30px;
    padding: 10px;
    border-radius: 8px;
    color: var(--vp-c-green-1);
    background-color: var(--vp-c-green-soft);
    transition: var(--feedback-form-transition) all;
}

@media (max-width: 450px) {
    .feedback-form {
        width: 100%;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 0 10px var(--vp-accent-border);
    }

    .feedback-form-holder {
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: 1;
    }
}
</style>