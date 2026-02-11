import { Plugin } from "vue";
import { createCaptchaFetchHandler } from "waf-captcha-frontend";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $captcha: {
            fetch: ReturnType<typeof createCaptchaFetchHandler> | null;
            isReady: boolean;
        };
    }
}

let captchaInstance: ((path: RequestInfo | URL, init: RequestInit) => Promise<Response>) | null = null;

const initCaptcha = () => {
    if (typeof window === "undefined") {
        captchaInstance = fetch;
        return
    }
    if (captchaInstance) return captchaInstance;

    // @ts-ignore
    const { VITE_JSAPI_URL, VITE_CAPTCHA_TOKEN } = import.meta.env;

    if (!VITE_CAPTCHA_TOKEN || !VITE_JSAPI_URL) {
        console.warn('Captcha configuration missing');
        return null;
    }

    captchaInstance = createCaptchaFetchHandler({
        API_KEY: VITE_CAPTCHA_TOKEN,
        JSAPI_URL: VITE_JSAPI_URL,
        captchaContainerId: "captcha-modal-container"
    });

    return captchaInstance;
};

const captchaFetch = initCaptcha();

const captchaPlugin: Plugin = {
    install(app: any) {
        app.config.globalProperties.$captchaFetch = captchaFetch;
        app.config.globalProperties.$captcha = {
            fetch: captchaFetch,
            isReady: !!captchaFetch
        };

        // Provide для Composition API
        app.provide('captchaFetch', captchaFetch);
        app.provide('captcha', {
            fetch: captchaFetch,
            isReady: !!captchaFetch
        });
    }
};

export { captchaPlugin };