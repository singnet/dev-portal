<template>
    <div class="feedback-form-holder">
        <div class="feedback-form" :class="{ 'hidden': !isFormDisplayed }">
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
                        <input id="name" placeholder="Enter your name" />
                    </div>
                    <div class="form-field">
                        <label for="email">
                            Email
                        </label>
                        <input id="email" placeholder="Enter your email" />
                    </div>
                    <div class="form-field">
                        <label for="Feedback">
                            Feedback
                        </label>
                        <textarea id="Feedback" placeholder="Enter your feedback" />
                    </div>
                    <div class="form-field">
                        <label for="category">
                            Support category
                        </label>
                        <select id="category" placeholder="Select a category">
                            <option value="question">Question</option>
                            <option value="bug">Bug</option>
                        </select>
                    </div>
                </fieldset>
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
export default {
    data() {
        return {
            isFormDisplayed: false,
        }
    },
    methods: {
        toggleFormVisibility() {
            this.isFormDisplayed = !this.isFormDisplayed;
        }
    }
}
</script>
<style scoped>
.feedback-form-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    position: fixed;
    bottom: 50px;
    right: 30px;
    z-index: 50;
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
    border: 1px solid var(--vp-c-purple);
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

.form-field textarea {
    min-height: 70px;
    max-height: 150px;
}

.dark .form-field input,
.form-field textarea {
    background-color: var(--feedback-form-input-background);
}

.feedback-form-launcher {
    transition: var(--feedback-form-transition) all;
}

.feedback-form-launcher:hover {
    transform: scale(1.1);
}
</style>