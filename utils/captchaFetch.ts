import { createCaptchaFetchHandler } from "waf-captcha-frontend";

export const getCaptchaFetch = () => {
    if (typeof window === "undefined") {
        return fetch;
    }
    // @ts-ignore
    const { VITE_JSAPI_URL, VITE_CAPTCHA_TOKEN } = import.meta.env;

    if (!VITE_CAPTCHA_TOKEN || !VITE_JSAPI_URL) {
        throw new Error("Tokens undefined");
    }

    const captchaFetch = createCaptchaFetchHandler({
        API_KEY: VITE_CAPTCHA_TOKEN,
        JSAPI_URL: VITE_JSAPI_URL,
        captchaContainerId: "captcha-modal-container"
    });

    return captchaFetch;
}